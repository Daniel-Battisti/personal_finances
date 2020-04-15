
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;


function startServer() {
  const app = express();


  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));


  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;

    console.log(m);
    next();
  });


  app.use(express.static('public'));


  return app.listen('8000', () => {

    console.log('Local DevServer Started on port 8000...');
  });
}

startServer();
