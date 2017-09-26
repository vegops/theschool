# theschool
JBproject

The School API


Version
Date
Author
Description
1.0
22/09/2017
Ethan Reubens
First version


Index
1. login
Request
Response
2. Requests and Responses
Request
Response
3. Objects
Request
Response
4. Functions
Request
Response










Methods
1. login
Authenticate the user with the system and obtain the auth_token
Request
Method
URL            
POST
login/login.php


Type
Params
Values
HEAD
POST
POST
content-type
email
pass
application/x-www-form-urlencoded
String - from a variable ‘email’
string - from a variable ‘pass’

Response
Status
Response
200
responseText







1. All requests
Authenticate the user with the system and obtain the auth_token
User Request
Method
URL            
POST
login/login.php


Type
Params
Values
HEAD
POST
POST
content-type
email
pass
application/x-www-form-urlencoded
String - from a variable ‘email’
string - from a variable ‘pass’

Response
Status
Response
200
responseText







Glossary
Conventions
All requests and responses are in JSON format.
Status Codes
All status codes are standard HTTP status codes. The below ones are used in this API.

2XX - Success of some kind
4XX - Error occurred in client’s part
5XX - Error occurred in server’s part

Status Code
Description
200
OK
201
Created
202
Accepted (Request accepted, and queued for execution)
400
Bad request
401
Authentication failure
403
Forbidden
404
Resource not found
405
Method Not Allowed
409
Conflict
412
Precondition Failed
413
Request Entity Too Large
500
Internal Server Error
501
Not Implemented
503
Service Unavailable




