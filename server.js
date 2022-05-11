const app = require("./index");
const Connectdatabase = require("./database/monodbconnect");

//Handling uncaught Exception


//config
require("dotenv").config({
  path: "./.env",
});

///connect Database

Connectdatabase();

//create server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unhandle promise rejection
