## Introduction

The Microsoft Graph Login node handles the login part on your Microsoft Graph API app. The node will output an access and bearer token, as well as store it in a flow value so that you can access it any time while the container is running. The access token is required for all calls to Microsoft Graph.

This node aims to simplify using Microsoft Graph by handling the login procedure for you, since while making calls to the Microsoft Graph api is quite simple, the login procedure has a tendency to be error prone and does not provide useful error messages when failing to authenticate.

The node provides login for both application and delegated permissions. Delegated permissions being on behalf of user and application permissions being the without user option. In the case of delegate permissions this is via a code and for application permissions using clientid and clientsecret. How both logins need to be configured will be described in detail in their own chapters.

Note that the permissions / account you wish to use already need to be accepted by a global admin, this call is not meant to be used with permissions / account that are not yet verified. This is not part of the login procedure.

## Other libraries used
node-fetch is used by the js file. You can install this via npm-install node-fetch. This is used to make use of the fetch command in nodejs to  make the POST call to Microsoft's OAuth page.

While fetch is a normal call in regular javascript, nodejs unfortunately does not support the call and requires you to build it yourself, hence why a 3rd party node was used.

For more information about node-fetch: [https://www.npmjs.com/package/node-fetch](https://www.npmjs.com/package/node-fetch)

## Update History

### 1.1.3
- Added Refresh after minutes option to state how long the token stays valid (or set to 0 if unneeded). Check is still done every minute if higher then zero
- Access token for Application now also goes through the refresh cycle
- Added the following flow values: graphdelegatedrefreshtokenexpirationdate, graphapplicationrefreshtimer and graphapplicationexpirationdate


## Useful links

Here are some links to the subjects that we will discuss to give you a better understanding of what the permissions mean, what Microsoft Graph is and what url encoding does.

Url encoding

[https://www.w3schools.com/tags/ref_urlencode.ASP](https://www.w3schools.com/tags/ref_urlencode.ASP)

Microsoft Graph Explorer

[https://developer.microsoft.com/en-us/graph/graph-explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)

Access without a user

[https://docs.microsoft.com/en-us/graph/auth-v2-service](https://docs.microsoft.com/en-us/graph/auth-v2-service)

Access on behalf of a user

[https://docs.microsoft.com/en-us/graph/auth-v2-user](https://docs.microsoft.com/en-us/graph/auth-v2-user)

Microsoft Graph permissions

[https://docs.microsoft.com/en-us/graph/permissions-reference](https://docs.microsoft.com/en-us/graph/permissions-reference)

Creating an app

[https://docs.microsoft.com/en-us/graph/auth-register-app-v2?context=graph/api/1.0](https://docs.microsoft.com/en-us/graph/auth-register-app-v2?context=graph/api/1.0)
 

## Url Encoding

The body of a Microsoft Graph call, in other words the parameters you will be setting in the node, need to be url encoded. You can use the field apply url encoding if you want the node to do it for you. Note that we do not check if any fields already use url encoding at the point, so make sure that isn’t the case or it will be url encoded again in which case the variable’s value will be wrong.

You can check the useful links section for a tutorial on url encoding. In short non-ASCII characters and spaces require url encoding, which comes in the form of %NUMBER% with a specific number representing what it means, for instance %20% is a space. To name an example [http://localhost](http://localhost) will become http%3A%2F%2Flocalhost when url encoded.

## Output

Node-red nodes returns the msg object. Three values of interest are set in the output. These are payload, at and rt. Keep in mind that most calls also uses the msg.payload to show their output, so if there is anything in there you want to preserve set it in your own variable before using other call nodes such as http request.

The msg object is unique to the session. Once you reach the end of your flow the msg object is deleted. This is why the values are also set in flow variables, that will exist as long the node-red is running.

| **Name** | **Value** |
| --- | --- |
| msg.payload | Contains the response of the login call, good or bad or a message that token is still valid |
| msg.payload.error | Contains the error details / code in case the login fails |
| msg.at | The access_token to be used in your Microsoft Graph calls |
| msg.rt | For delegated permissions this contains the refresh token that is required to refresh the access_token one hour after a successful login. Not applicable for Application, but it is present, but contains the same contact as msg.at |
  

## Without User Login (Application permissions)

Using application permissions means you are performing the calls not as a specific user but as an application of the organization and depending on the permissions given you can also impersonate any member of the organization. These apps are usually meant for background processes that do not require user intervention, such as sending pre-written emails when a certain task is performed.

The access token of an application permission based app does not expire, so once you have obtained you can reuse it indefinitely. Only if changes are made to the app, for instance adding more permissions, then a new login is required if you wish to use these permissions in your Node-Red environment as well.

### Without User Parameters

We will now go into detail on what parameters are part of the without user call.

| **Property Name** | **Description** |
| --- | --- |
| Name| How you want to call the node |
| Login Type | The login type you want to use, in this example, Without User is selected |
| ClientId | The client id of the app you want to use |
| ClientSecret | The permissions your app is supposed to have, keep in mind that the permission names are different between application and delegated |
| Scope | The permissions your app is supposed to have, keep in mind that the permission names are different between application and delegated |
| TenantId | Id of your organization, can be found in the Azure portal |
| Refresh after Minutes | After x amount of minutes refresh the token. If set to 0 no refresh is applied. The token is checked every minute to see if it is still valid |
| Apply Url Encoding | Whether or not url encoding needs to be applied, read the url encoding chapter for more information to how this works. In the above screen we have applied url encoding ourselves so we will leave it as false |

### Flow Variables Set

Flow variables exist as long as the container exists and no errors occur when refreshing. You can retrieve them via flow.get("FLOWNAME");

Upon making a fresh call the flow variables will also get refreshed. Most of the flow variables are present to compare to the previous request

Clientid, Clientsecret and Tenantid are stored on their actual id, so that it cannot be retrieved without knowing the value. If the value is not found it is assumed this is a fresh call

| **Name** | **Value** |
| --- | --- |
| graphapplicationaccesstoken | The access_token to be used in your Microsoft Graph calls if you used application login |
| graphapplicationbearertoken | Bearer + the application access_token is set in this, this is how you are supposed to set the token in your calls |
| graphapplicationscope | Saves the last used application scope to compare it in the next call to check if the code has changed and therefore a fresh login should be made rather then a refresh |
| graphapplicationexpirationdate | Expiration date of the delegated refresh token |
| graphapplicationrefreshtimer | Amount of minutes added to the expiration date when a refresh is done |

## On behalf of User Login (Delegated permissions)

Using delegated permissions you log in as a specific person of the organization so any actions performed are also credited to that person, for instance sending an email will then use that person’s email address.

You do not use that person’s username and password to login. Instead a separate url will be called with these credentials, after which Microsoft provides you with a login code. You can then use this code to login. The code only works once, so keep this in mind if you make any changes to your app in the future.

The access token for this type also expires after an hour. However upon the initial login a refresh token is provided, that can be used to generate a new access and refresh token. Using this you can make certain that you do not need to perform any additional actions to keep the process alive. The node also has it’s own timer that checks if the refresh needs to be performed so you do not need to perform these actions yourself. As stated in the introduction the access token is also stored in a flow variable, so by simply including this variable in your calls your flow will always have the latest usable access token, assuming no errors occur while verifying.

### Obtaining a code

The code needs to obtained with the account you want to use, when accessing the url it will ask you to login with your Microsoft Account. You can get the code at [https://login.microsoftonline.com/TENANTID/oauth2/v2.0/authorize?client_id=CLIENTID&response_type=code&redirect_uri=REDIRECTURI&response_mode=query&scope=offline_access%20SCOPES&state=12345](https://login.microsoftonline.com/TENANTID/oauth2/v2.0/authorize?client_id=CLIENTID&response_type=code&redirect_uri=REDIRECTURI&response_mode=query&scope=offline_access%20SCOPES&state=12345)

So you need to include the tenantid, clientid of this app, the redirect uri of the app and the scopes / permissions you want access in this request. If executed correctly, you will see a code= in the browser url bar. Copy this code, and put it in this field. The url generated will look like this: http://localhost/?code=CODE&state=12345&session_state=201c5d43-cc55-4030-af0a-bf4d0754d9d0#

  
### On Behalf of User Parameters

We will now go into detail on what parameters are part on the behalf of user call.

| **Property Name** | **Description** |
| --- | --- |
| Name | How you want to call the node |
| Login Type | The login type you want to use, in this example, On behalf of User is selected |
| ClientId | The client id of the app you want to use |
| ClientSecret | The client secret of the app you want to use |
| Scope | The permissions your app is supposed to have, keep in mind that the permission names are different between application and delegated |
| TenantId | Id of your organization, can be found in the Azure portal |
| RedirectUri | Contains the redirecturi you specified for the app. If you have not altered this value it should be [http://localhost](http://localhost) |
| Code | One time valid code to login. After this the node will use the refresh token and keep refreshing it to keep the connection alive |
| Refresh after Minutes | After x amount of minutes refresh the token. If set to 0 no refresh is applied. The token is checked every minute to see if it is still valid |
| Apply Url Encoding | Whether or not url encoding needs to be applied, read the url encoding chapter for more information to how this works. In the above screen we have not applied url encoding so we check this box to have the code do it for us |

### Flow Variables Set

Flow variables exist as long as the container exists and no errors occur when refreshing. You can retrieve them via flow.get("FLOWNAME");

Upon making a fresh call the flow variables will also get refreshed. Most of the flow variables are present to compare to the previous request

Clientid, Clientsecret and Tenantid are stored on their actual id, so that it cannot be retrieved without knowing the value. If the value is not found it is assumed this is a fresh call

| **Name** | **Value** |
| --- | --- |
| graphdelegatedaccesstoken | The access_token to be used in your Microsoft Graph calls if you used application login |
| graphdelegatedbearertoken | Bearer + the application access_token is set in this, this is how you are supposed to set the token in your calls |
| graphdelegatedrefreshtoken | Contains the refresh token for delegated login |
| graphdelegatedscope | Saves the last used application scope to compare it in the next call to check if the code has changed and therefore a fresh login should be made rather then a refresh |
| graphdelegatedredirecturi | Saves the last used redirecturi to compare it in the next call to check if the code has changed and therefore a fresh login should be made rather then a refresh |
| graphdelegatedcode | Saves the last used code to compare it in the next call to check if the code has changed and therefore a fresh login should be made rather then a refresh |
| graphdelegatedrefreshtokenexpirationdate | Expiration date of the delegated refresh token |
| graphdelegatedrefreshtimer | Amount of minutes added to the expiration date when a refresh is done |

## Using the node in a flow

Since the node provides both the msg object as well as setting the access token in a flow variable you basically only have to make the call once to this node and then use the flow variables from that point on for all your Microsoft Graph calls in that container.

If you prefer you could also go for the msg route and simply put the node in every call you make. A fresh login will only be made if any of the values change or the container is restarted so in this case the msg.payload will mention that the token is still valid, but it will still fill the at and rt variables with the currently active tokens.
