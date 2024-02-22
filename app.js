const express = require('express');
const app = express ();
const dotenv = require('dotenv')
dotenv.config()


const port = process.env.PORT || 3000
app.use(express.json());

app.get('/status', (request, response) => {
    const status = {
       'Status': "Running"
    };
    
    response.send(status);
 });

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });