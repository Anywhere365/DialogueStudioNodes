## Introduction

The JWT token node can create a JWT token for authentication use.
It needs a body that contains the information and a secret to encrypt the input.
more information about the JWT token and the structure can be found at [https://jwt.io](https:jwt.io)

You can download the node from the node-red library

## Important

You need to install the jsonwebtoken library upfront
npm install jsonwebtoken

This can be done for example with an exec-node


## Other libraries used
this node needs a msg.body and a msg.secret, or both can be entered in the node config page

the msg.body shoudl contain the body of the jwt token like: { "iss": "123456-4444-5555-abcd-999999999", "iat": 1672990193 }

and a msg.secret which contains the key to encrypt the body.

a header will automatically be added which contains: {"alg":"HS256"}
