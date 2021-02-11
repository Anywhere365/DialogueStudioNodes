const fetch = require("node-fetch");

module.exports = function (RED) {
    function GraphOnBehalfLoginNode(config) {
        RED.nodes.createNode(this, config);
        var flowContext = this.context().flow;

        //Variables in Credentials are automatically added to this.credentials. Variables in defaults are stored in config.
        this.code = config.code;
        this.scope = config.scope;
        this.redirecturi = config.redirecturi;
        this.encoding = config.encoding;
        this.logintype = config.logintype;
        this.refreshtimer = config.refreshtimer;

        var node = this;

        node.on('input', function (msg) {
            Login(flowContext, node, msg);
        });
    }

    //Entrance method of the node
    async function Login(flowContext, node, msg) {
        node.log("Type of login: " + node.logintype);
        var isDelegated = node.logintype == "Delegated";

        if (node.credentials.clientid == undefined || node.credentials.clientid == "") {
            msg.payload = "Empty ClientId";
            node.send(msg);
            return;
        }
        if (node.credentials.clientsecret == undefined || node.credentials.clientsecret == "") {
            msg.payload = "Empty ClientSecret";
            node.send(msg);
            return;
        }
        if (node.credentials.tenantid == undefined || node.credentials.tenantid == "") {
            msg.payload = "Empty TenantId";
            node.send(msg);
            return;
        }
        if (node.scope == "") {
            msg.payload = "Empty Scope";
            node.send(msg);
            return;
        }

        if (isDelegated) {

            if (node.code == "") {
                msg.payload = "Empty Code";
                node.send(msg);
                return;
            }
            if (node.redirecturi == "") {
                msg.payload = "Empty Redirect Uri";
                node.send(msg);
                return;
            }
        }

        //Check if initial login or that data has changed in the node fields, which also means a new login
        node.log("Checking for login / refresh");
        node.refreshtoken = isDelegated ? flowContext.get("graphdelegatedrefreshtoken") : flowContext.get("graphapplicationaccesstoken");
        var initiallogin = IsInitialLogin(node, flowContext);

        //Inf initial login set the flow values for next time, if not, check for refresh window if delegated or return access token when using application permissions
        if (initiallogin) {
            SetInitialContext(flowContext, node);
        }
        else if (isDelegated && NotExpired(flowContext, isDelegated, node)) {
            msg.payload = "Refresh token still valid, no further action will be taken";
            node.log(msg.payload);
            msg.at = flowContext.get("graphdelegatedaccesstoken");
            msg.bearer = flowContext.get("graphdelegatedbearertoken");
            msg.rt = flowContext.get("graphdelegatedrefreshtoken");
            node.send(msg);
            return;
        }

        else if (!isDelegated && NotExpired(flowContext, isDelegated, node)) {
            msg.payload = "Application access token still valid, no further action will be taken";
            node.log(msg.payload);
            msg.at = flowContext.get("graphapplicationaccesstoken");
            msg.rt = msg.at;
            msg.bearer = flowContext.get("graphapplicationbearertoken");
            node.send(msg);
            return;
        }

        var response = await ExecuteLogin(flowContext, node, initiallogin);
        node.log("Login done");

        if (response != undefined) {
            SetMessageResponse(msg, response, node);
        }
    }

    function NotExpired(flowContext, isDelegated, node) {
        var expirationdate = isDelegated ? flowContext.get("graphdelegatedrefreshtokenexpirationdate") : flowContext.get("graphapplicationexpirationdate");
        var flowRefreshTimer = isDelegated ? flowContext.get("graphdelegatedrefreshtimer") : flowContext.get("graphapplicationrefreshtimer");
        var refreshtimer = node.refreshtimer;
        var date = new Date();

        if (refreshtimer == undefined || refreshtimer == null || refreshtimer < 0) {
            refreshtimer = 0;
        }

        if (flowRefreshTimer == undefined || flowRefreshTimer == null || flowRefreshTimer < 0) {
            flowRefreshTimer = 0;
        }

        if (flowRefreshTimer != refreshtimer) {
            node.log("Refresh time changed. Old: " + flowRefreshTimer + " New: " + refreshtimer);

            if (isDelegated) {
                flowContext.set("graphdelegatedrefreshtimer", refreshtimer);
            }
            else {
                flowContext.set("graphapplicationrefreshtimer", refreshtimer);
            }

            node.log("Timer change, performing refresh");
            return false;
        }

        if (refreshtimer == 0) {
            node.log("Timer set to zero, performing refresh");
            return false;
        }

        node.log("Expiration date: " + expirationdate + ". Current date: " + date);
        return expirationdate != undefined && expirationdate > date;
    }

    //Timer object needs to be defined, otherwise we cannot kill the old timer
    var delegatedTimer;
    var applicationTimer;

    //THe actual to Graph, done after checking the values upon calling the node or when the refresh is called by the timer
    async function ExecuteLogin(flowContext, node, initiallogin) {

        try {
            var form = "";
            var clientid = node.encoding ? encodeURIComponent(node.credentials.clientid) : node.credentials.clientid;
            var clientsecret = node.encoding ? encodeURIComponent(node.credentials.clientsecret) : node.credentials.clientsecret;
            var code = node.encoding ? encodeURIComponent(node.code) : node.code;
            var tenantid = node.encoding ? encodeURIComponent(node.credentials.tenantid) : node.credentials.tenantid;
            var redirecturi = node.encoding ? encodeURIComponent(node.redirecturi) : node.redirecturi;
            var scope = node.encoding ? encodeURIComponent(node.scope) : node.scope;
            var isDelegated = node.logintype == "Delegated";

            form = encodeURIComponent('client_id') + "=" + clientid + "&"
                + encodeURIComponent('client_secret') + "=" + clientsecret + "&"
                + encodeURIComponent('scope') + "=" + scope + "&" + encodeURIComponent('grant_type') + "=";

            if (initiallogin == true || !isDelegated) {
                form = isDelegated
                    ? form + encodeURIComponent('authorization_code') + "&" + encodeURIComponent('code') + "=" + code
                    : form + encodeURIComponent('client_credentials');
            }
            else {
                var rt = encodeURIComponent('refresh_token');
                //One is the grant_type and the other is the actual variable refresh_token
                form = form + rt + "&" + rt + "=" + encodeURIComponent(node.refreshtoken);
            }

            if (isDelegated) {
                form = form + "&" + encodeURIComponent('redirect_uri') + "=" + redirecturi;
            }

            node.log("Used Encoding: " + node.encoding);
            var url = "https://login.microsoftonline.com/" + tenantid + "/oauth2/v2.0/token";

            //Use this for debugging
            //node.log("Full request: " + url + form);

            var response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Host': 'login.microsoftonline.com'
                },
                body: form
            }).then(response => response.json());

            if (response.access_token != undefined) {
                var accesstoken = response.access_token;
                var bearer = "Bearer " + accesstoken;

                if (isDelegated) {
                    flowContext.set("graphdelegatedaccesstoken", accesstoken);
                    flowContext.set("graphdelegatedbearertoken", bearer);
                    flowContext.set("graphdelegatedrefreshtoken", response.refresh_token);
                }
                else {
                    flowContext.set("graphapplicationaccesstoken", accesstoken);
                    flowContext.set("graphapplicationbearertoken", bearer);                    
                }

                SetTimer(flowContext, node, isDelegated);
                node.log("Tokens set");
            }
            else {
                node.log("Error in response: " + response.error);
            }

            return response;
        }
        catch (error) {
            node.log(error);
            return error;
        }
    }

    function SetTimer(flowContext, node, isDelegated) {
        var expirationdate = new Date();
        //Despite being a number in the UI, it is not an actual number, however + string is accepted in JS and will create some wonky results, so be sure to parse to int
        var refreshtimer = parseInt(node.refreshtimer);
        expirationdate.setMinutes(expirationdate.getMinutes() + refreshtimer);

        node.log("Setting Expiration date to: " + expirationdate);

        if (isDelegated) {
            flowContext.set("graphdelegatedrefreshtokenexpirationdate", expirationdate);

            //Unfortunately we cannot use timer as a parameter, js does not understand this and will not kill the old timer because it always sees it as a new timer, thus creating continous timers
            if (delegatedTimer) {
                node.log("Removing old delegated timer");
                clearInterval(delegatedTimer);
            }

            if (node.refreshtimer > 0) {
                node.log("Setting new Delegated timer");
                delegatedTimer = setInterval(function () { ExpirationCheck(flowContext, node, expirationdate); }, 60000);
            }
            else {
                node.log("No timer specified");
            }
        }
        else {
            flowContext.set("graphapplicationexpirationdate", expirationdate);

            if (applicationTimer) {
                node.log("Removing old application timer");
                clearInterval(applicationTimer);
            }

            if (node.refreshtimer > 0) {
                node.log("Setting new application timer");
                applicationTimer = setInterval(function () { ExpirationCheck(flowContext, node, expirationdate); }, 60000);
            }
            else {
                node.log("No timer specified");
            }
        }
    }

    //Log if value is changed, prompting a new login rather then a refresh
    function SetMessageResponse(msg, response, node) {

        if (response != null) {
            msg.payload = response;
            var accesstoken = response.access_token;

            if (response.access_token != undefined) {
                msg.at = accesstoken;
                msg.rt = node.logintype == "Delegated" ? response.refresh_token : accesstoken;
                msg.bearer = "Bearer " + accesstoken;
            }
        }

        node.send(msg);
    }

    //Timer method
    async function ExpirationCheck(flowContext, node, expirationdate) {
        node.log("Interval reached. Checking if refresh is required");

        var date = new Date();
        node.log("Expiration date: " + expirationdate + ". Current date: " + date);

        if (expirationdate != undefined && expirationdate > date) {
            node.log("Refresh token still valid, no further action will be taken");
            return;
        }

        node.log("Expiration date has passed, refreshing token")
        var initiallogin = false;
        await ExecuteLogin(flowContext, node, initiallogin);
    }

    //Check if initial login or refresh is required
    function IsInitialLogin(node, flowContext) {
        if (node.refreshtoken == undefined || node.refreshtoken == null) {
            node.log("(Refresh) Token not set, initial login")
            return true;
        }

        if (node.logintype == "Delegated") {
            return IsInitialDelegatedLogin(node, flowContext);
        }

        return IsInitialApplicationLogin(node, flowContext);
    }

    //Check if initial login or refresh is required for delegated permissions
    function IsInitialDelegatedLogin(node, flowContext) {
        var flowcode = flowContext.get("graphdelegatedcode");
        var flowclientid = flowContext.get(node.credentials.clientid);
        var flowclientsecret = flowContext.get(node.credentials.clientsecret);
        var flowtenantid = flowContext.get(node.credentials.tenantid);
        var flowredirecturi = flowContext.get("graphdelegatedredirecturi");
        var flowscope = flowContext.get("graphdelegatedscope");

        if (node.code != flowcode) {
            return LogChange(node, flowContext, "Code");
        }
        if (node.scope != flowscope) {
            return LogChange(node, flowContext, "Scope");
        }
        if (flowclientid == undefined) {
            return LogChange(node, flowContext, "ClientId");
        }
        if (flowclientsecret == undefined) {
            return LogChange(node, flowContext, "ClientSecret");
        }
        if (flowtenantid == undefined) {
            return LogChange(node, flowContext, "TenantId");
        }
        if (node.redirecturi != flowredirecturi) {
            return LogChange(node, flowContext, "RedirectUri");
        }

        node.log("Checking if refresh is required");
        return false;
    }

    //Check if initial login or refresh is required for application permissions
    function IsInitialApplicationLogin(node, flowContext) {
        var flowclientid = flowContext.get(node.credentials.clientid);
        var flowclientsecret = flowContext.get(node.credentials.clientsecret);
        var flowtenantid = flowContext.get(node.credentials.tenantid);
        var flowscope = flowContext.get("graphapplicationscope");

        if (node.scope != flowscope) {
            return LogChange(node, flowContext, "Scope");
        }
        if (flowclientid == undefined) {
            return LogChange(node, flowContext, "ClientId");
        }
        if (flowclientsecret == undefined) {
            return LogChange(node, flowContext, "ClientSecret");
        }
        if (flowtenantid == undefined) {
            return LogChange(node, flowContext, "TenantId");
        }

        node.log("Checking if refresh is required");
        return false;
    }

    //Logging the value that has changed since the last time the node was called
    function LogChange(node, flowContext, value) {
        flowContext.set("graphdelegatedrefreshtoken");
        node.log(value + " changed, performing new login");
        return true;
    }

    //Setting the flows that need to be checked if they changed
    function SetInitialContext(flowContext, node) {

        flowContext.set(node.credentials.clientid, true);
        flowContext.set(node.credentials.clientsecret, true);
        flowContext.set(node.credentials.tenantid, true);

        var refreshtimer = node.refreshtimer == undefined || node.refreshtimer < 0 || node.refreshtimer == null ? 0 : node.refreshtimer;

        if (node.logintype == "Delegated") {
            flowContext.set("graphdelegatedcode", node.code);
            flowContext.set("graphdelegatedredirecturi", node.redirecturi);
            flowContext.set("graphdelegatedscope", node.scope);
            flowContext.set("graphdelegatedrefreshtimer", refreshtimer);
            return;
        }

        flowContext.set("graphapplicationscope", node.scope);
        flowContext.set("graphapplicationrefreshtimer", refreshtimer);
    }

    //Credenitals need to be registered in the js as well, otherwise Node-Red will throw an error that it does not recgonize these types
    RED.nodes.registerType("node-red-contrib-graph-oauth-login", GraphOnBehalfLoginNode, {
        credentials: {
            clientid: { type: "password" },
            clientsecret: { type: "password" },
            tenantid: { type: "password" }
        }
    });
}