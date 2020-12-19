# backend-service

## Steps to setup project
1. Run the command `npm install` to isntall all the dependencies
2. To start server runnning at *3000* PORT.`npm start`

## API LIST
1. To autheticate user
    * API: `127.0.0.1:3000/login`
    * POST DATA: `{userid: userid_val, password: pass_val}`
    * Success: `{status: true, Result: {token: jwt_tkn}}` and statuscode 200 
2. To patch json
    * API: `127.0.0.1:3000/patch`
    * POST DATA: `{token: jwt_tkn_received_at_login, document: json_document_to_patch, operation: patch_operation_in_json_format}`
    * Success: `{status: true, Result: {token: jwt_tkn, newDocument: patchedJSON}}` and statuscode 200 
3. To generate thumbnail
    * API: `127.0.0.1:3000/generateThumbnail`
    * POST DATA: `{token: jwt_tkn_received_at_login, imgUrl: valid_url}`
    * Success: `{status: true, Result: {token: jwt_tkn, thumbnailBase64: base64String}}` and statuscode 200 