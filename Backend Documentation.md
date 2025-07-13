# ExpenseTracker
# Backend npm install 
# 1. npm init -y
Purpose: Creates a package.json file in your project.
Why: It initializes your Node.js project so you can install and manage dependencies.
What happens: It generates a default package.json file without asking questions (-y = “yes” to all prompts).

# 2. npm i express@4.21.0
Installs: Express.js version 4.21.0
Purpose: Sets up a lightweight web server framework.
Why: Express is the most popular way to build REST APIs and server routes in Node.js. It's fast, minimal, and highly flexible.

# 3. npm i dotenv@16.5.0
Installs: dotenv version 16.5.0
Purpose: Loads environment variables from a .env file into process.env.
Why: Keeps secrets (like API keys, DB credentials) out of your source code.

# 4. npm i cors@2.8.5
Installs: cors version 2.8.5
Purpose: Middleware to enable CORS (Cross-Origin Resource Sharing) in your backend/server.
Why: CORS is required when your frontend and backend are on different domains or ports (e.g., localhost:3000 to localhost:4000).

# 5. npm i @neondatabase/serverless@1.0.0
Installs: @neondatabase/serverless version 1.0.0
Purpose: Provides a PostgreSQL client optimized for serverless environments like Vercel or AWS Lambda.
Why: Neon is a modern serverless Postgres provider. This package uses HTTP instead of TCP, making it work better in serverless functions (where TCP connections are hard to manage).

# 6. npm i -D nodemon
Installs: nodemon as a development dependency
Purpose: A tool that automatically restarts your Node.js server when it detects file changes during development.
Why: In a typical development workflow, every time you make a change to your server code (like in index.js), you'd normally have to manually stop and restart the server using node index.js.
With nodemon, this happens automatically—it watches your files and restarts the app as needed, saving time and reducing errors.
This is especially helpful during backend development with Express or APIs, where you frequently change routes or logic.
"dev": "nodemon server.js" -> tells which file to run

# why is "type":"module" added to package.json
When you set this in your package.json: "type": "module"
You're telling Node.js to treat your code as using ECMAScript Modules (ESM) instead of CommonJS.

So you can use import and export syntax natively in Node.js:
Instead of:
// CommonJS
const express = require('express');
module.exports = app;

You can do:
// ES Modules (with "type": "module")
import express from 'express';
export default app;

# What is API?
full form of API is Application Programming Interface
It allows two different application talk to each other
APIs are all around us
Send a mobile payment

front end ----Get----> API ---------> DB
(App, Web)<----------      <-------- (postgre)

REST API = GET, POST, PUT, DELETE

# Middleware 
middleware is a function that runs in the middle between the request and the response


Client ----Req-----------> Server
     ^-----Res---[Middleware]- 

Req = send request
Middleware = check the auth before sending result
Res = Get the result