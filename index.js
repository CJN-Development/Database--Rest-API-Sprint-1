const express = require("express");
const bodyParser = require("body-parser");

const restAPP = express();

const pgDBAccessLayer = require("./pg_data_access/pg_db_access");
const port = 3000;

restAPP.use(bodyParser.json());
restAPP.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

restAPP.get("/", (request, response) => {
  response.json({ info: "Node.Js, Express, and Postgres API" });
});

// Queries To Answer The Questions
restAPP.get("/airportcitys", pgDBAccessLayer.getAirPortCitys);
restAPP.get("/passengerplane", pgDBAccessLayer.getPassengerPlane);
restAPP.get("/allowedairports", pgDBAccessLayer.getAllowedAirports);
restAPP.get("/airportpassengers", pgDBAccessLayer.getAirportPassengers);

//  Get Endpoints For The API
restAPP.get("/airport", pgDBAccessLayer.getAirport);
restAPP.get("/cities", pgDBAccessLayer.getCities);
restAPP.get("/passengers", pgDBAccessLayer.getPassengers);
restAPP.get("/aircraft", pgDBAccessLayer.getAircraft);

// Create Endpoints

restAPP.post("/createairport", pgDBAccessLayer.createAirport);
restAPP.post("/createcity", pgDBAccessLayer.createCity);
restAPP.post("/createaircraft", pgDBAccessLayer.createAircraft);
restAPP.post("/createpassenger", pgDBAccessLayer.createPassenger);

// Delete Endpoints

restAPP.delete("/deleteairport", pgDBAccessLayer.deleteAirport);
restAPP.delete("/deletecity", pgDBAccessLayer.deleteCity);
restAPP.delete("/deleteaircraft", pgDBAccessLayer.deleteAircraft);
restAPP.delete("/deletepassenger", pgDBAccessLayer.deletePassenger);

// Update Endpoints

restAPP.put("/updateairport", pgDBAccessLayer.updateAirport);

restAPP.listen(port, () => {
  console.log(`App Is Running on port ${port}.`);
});
