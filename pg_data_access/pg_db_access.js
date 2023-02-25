const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QAP1",
  password: "jordan1234",
  port: 5433,
});

// ======================== Queries for the questions =================================
/**
 * 
 * Cities can have many airports

· Passengers can fly on many aircraft and live in one city

· Aircraft can have many passengers and land/take off from many Airports

· Airports can only be in one city
 * 
 * 
 * 
 */
const getAirPortCitys = (request, response) => {
  pool.query(
    "select * from cities c, airports a,  city_airports ca where ca.city_id = c.id and ca.airport_id = a.id order by c.name ",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPassengerPlane = (request, response) => {
  pool.query(
    "select *from passengers p, aircraft a,  passenger_plane pa where pa.passenger_id = p.id and pa.aircraft_id = a.id ",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAllowedAirports = (request, response) => {
  pool.query(
    "select * from aircraft ac, airports a,  aircraft_airport aa  where aa.aircraft_id = ac.id and aa.airport_id = a.id order by ac.id ",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAirportPassengers = (request, response) => {
  pool.query(
    "select *from passengers p, airports a,  passenger_airport pa where pa.passenger_id = p.id and pa.airport_id = a.id order by p.first_name",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//   Read Endpoints For The API

const getAirport = (request, response) => {
  pool.query("select *from airports ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCities = (request, response) => {
  pool.query("select *from cities ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPassengers = (request, response) => {
  pool.query("select * from passengers ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAircraft = (request, response) => {
  pool.query("select * from aircraft ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 *
 * ================ Create Statements For API ====================
 *
 *
 */

const createAirport = (request, response) => {
  const { id, name, airport_code, passenger_used } = request.body;

  pool.query(
    "INSERT INTO airports (id, name, airport_code, passenger_used) VALUES ($1, $2, $3, $4)",
    [id, name, airport_code, passenger_used],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Airport added with ID: ${results.insertId}`);
    }
  );
};

const createCity = (request, response) => {
  const { id, name, province, population } = request.body;

  pool.query(
    "INSERT INTO cities (id, name, province, population) VALUES ($1, $2, $3, $4)",
    [id, name, province, population],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`City was added with ID: ${results.insertId}`);
    }
  );
};

const createAircraft = (request, response) => {
  const { id, type, airline_name, passanger_capicity } = request.body;

  pool.query(
    "INSERT INTO aircraft (id, type, airline_name, passanger_capicity) VALUES ($1, $2, $3, $4)",
    [id, type, airline_name, passanger_capicity],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Aircraft was added with ID: ${results.insertId}`);
    }
  );
};

const createPassenger = (request, response) => {
  const { id, first_name, last_name, phone_number, city_id } = request.body;

  pool.query(
    "INSERT INTO passengers (id, first_name, last_name, phone_number,city_id) VALUES ($1, $2, $3, $4, $5)",
    [id, first_name, last_name, phone_number, city_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Passenger was added with ID: ${results.insertId}`);
    }
  );
};

/**
 *
 * ================ Delete Statements For API ====================
 *
 *
 */

const deleteAirport = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM airports WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Airport deleted with ID: ${id}`);
  });
};

const deleteCity = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM cities WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`City deleted with ID: ${id}`);
  });
};

const deleteAircraft = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM aircraft WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Aircraft deleted with ID: ${id}`);
  });
};

const deletePassenger = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM passengers WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Passenger deleted with ID: ${id}`);
  });
};

/**
 *
 * ================ Update Statements For API ====================
 *
 *
 */

const updateAirport = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, airport_code, passenger_used } = request.body;

  pool.query(
    "UPDATE airports SET  name = $1, airport_code = $2, passenger_used = $3 WHERE id = $4" ,
    [name, airport_code, passenger_used,id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Student modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getAirPortCitys,
  getPassengerPlane,
  getAllowedAirports,
  getAirportPassengers,
  getCities,
  getAirport,
  getPassengers,
  getAircraft,
  createAirport,
  createCity,
  createAircraft,
  createPassenger,
  deleteAirport,
  deleteCity,
  deleteAircraft,
  deletePassenger,
  updateAirport,
};
