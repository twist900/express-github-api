This is an **express** app, which delivers third party data (github) from several endpoints. 
An authentication layer is implemented to validate the client.

Prerequisites
-------------
This application:
- Requires [Redis](http://redis.io/) for caching request results. Ensure that it is running on 127.0.0.1:6379.
- Uses [GitHub API v3](https://developer.github.com/v3/). See how to obtain the client key and secret bellow.

Getting Started
---------------

Clone the repository:

```bash
# Get the repo
git clone git@github.com:twist900/express-github-api.git

# Change directory
cd express-github-api

# Install NPM dependencies
npm install

# Run the application
npm start

# Run tests
npm test
```

Obtaining GitHub API Key
------------------------

<img src="https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Logo.png" width="200">
- Go to <a href="https://github.com/settings/profile" target="_blank">Account Settings</a>
- Select **Applications** from the sidebar
- Then inside **Developer applications** click on **Register new application**
- Enter *Application Name* and *Homepage URL*
- For *Authorization Callback URL*: http://localhost:3000/auth/github/callback
- Click **Register application**
- Now copy and paste *Client ID* and *Client Secret* keys into `.env` file

JWT tokens
----------

The application API endpoints are protected with **JWT tokens**. These tokens are obtained and returned to the client after the user successfully carries out authentication with GitHub. This way the client is validated without disclosing the GitHub token. On every API request, the client must send the JWT token in the Authorization header. The server then validates the token and, if it’s valid, returns the resource to the client. 

This token based authentication strategy is selected for its better support of both mobile and web clients. It enables construction of decoupled systems and does not require the use of cookies.


Endpoint Usage
--------------

- Visit http://127.0.0.1:3000/auth/github in the browser to authenticate with GitHub. After the oauth dance the app server will return a response:

```json
{"success":true,"jwt_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0Mzc0NzciLCJuYW1lIjoiR2Vvcmd5IFNoYWJ1bmluIiwiYWNjioNzVG9rZW4iOiJjMDBteuyDdiYTA4ZTQyYzE2YzY5MzU5YzkxNTIyMmM3YmE3MGY3YjVmIiwiaWF0IjoxNDc1NDQ0MDMzfQ.xj13SZGVAvgSX1VdTXqcWqxRElQKGVmHUhTYjik5hyg"}
```

-  Attach the received **jwt_token** in the Authorization header in all of the subsequent requests:

```bash	
 	# GET /repos
 	# Get public repos.
 	curl -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0Mzc0NzciLCJuYW1lIjoiR2Vvcmd5IFNoYWJ1bmluIiwiYWNjioNzVG9rZW4iOiJjMDBteuyDdiYTA4ZTQyYzE2YzY5MzU5YzkxNTIyMmM3YmE3MGY3YjVmIiwiaWF0IjoxNDc1NDQ0MDMzfQ.xj13SZGVAvgSX1VdTXqcWqxRElQKGVmHUhTYjik5hyg" http://localhost:3000/repos/
	
    # GET /repos/:id
 	# Get a single repo by id.
 	curl -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0Mzc0NzciLCJuYW1lIjoiR2Vvcmd5IFNoYWJ1bmluIiwiYWNjioNzVG9rZW4iOiJjMDBteuyDdiYTA4ZTQyYzE2YzY5MzU5YzkxNTIyMmM3YmE3MGY3YjVmIiwiaWF0IjoxNDc1NDQ0MDMzfQ.xj13SZGVAvgSX1VdTXqcWqxRElQKGVmHUhTYjik5hyg" http://localhost:3000/repos/1

 	# GET /repos/search/:query
  	# Search repositories.
	curl -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0Mzc0NzciLCJuYW1lIjoiR2Vvcmd5IFNoYWJ1bmluIiwiYWNjZXNzVG9rZW4iOiI4ZTI1ZGE3MDFiNjViYWQzMDBkNGIzZDQ0OGFiZDBiMTU5OWFkYjY3IiwiaWF0IjoxNDc1NDI0NjAzfQ.1Ht1IMUgG3cdJjEONuqFq9nRgQE32zvQjIF-sgtTyPQ" http://localhost:3000/repos/search/awesome
``` 


TODO
----

- Mock ([nock](https://github.com/node-nock/nock)) the GitHub API for more stable testing.