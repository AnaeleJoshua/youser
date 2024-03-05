const express = require('express');
const app = express ();
const dotenv = require('dotenv')
const UserRoutes = require('./users/routes')
const AuthRoutes = require('./authorization/routes')
dotenv.config()

const port = process.env.PORT || 3000
app.use(express.json());

  // Attaching the Authentication and User Routes to the app.
app.use('/',AuthRoutes);
app.use("/user", UserRoutes);

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });