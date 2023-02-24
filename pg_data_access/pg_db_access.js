const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'QAP1',
    password:'jordan1234',
    port:5433
})

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
    pool.query('select * from cities c, airports a,  city_airports ca where ca.city_id = c.id and ca.airport_id = a.id order by c.name ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getPassengerPlane = (request, response) => {
    pool.query('select *from passengers p, aircraft a,  passenger_plane pa where pa.passenger_id = p.id and pa.aircraft_id = a.id ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getAllowedAirports = (request, response) => {
    pool.query('select * from aircraft ac, airports a,  aircraft_airport aa  where aa.aircraft_id = ac.id and aa.airport_id = a.id order by ac.id ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getAirportPassengers = (request, response) => {
    pool.query('select *from passengers p, airports a,  passenger_airport pa where pa.passenger_id = p.id and pa.airport_id = a.id order by p.first_name', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  const getAirport = (request, response) => {
    pool.query('select *from airports ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

/**
 * 
 * ================ Create Statements For API ====================
 * 
 * 
 */



const createAirport = (request, response) => {
    const { id, name, airport_code, passenger_used} = request.body
  
    pool.query('INSERT INTO airports (id, name, airport_code, passenger_used) VALUES ($1, $2, $3, $4)',
      [id, name, airport_code, passenger_used], (error, results) => {
          if (error) {
            throw error
          }
          response.status(201).send(`Airport added with ID: ${results.insertId}`)
        })
  }

  const createCity = (request, response) => {
    const {id, name, province, population} = request.body
  
    pool.query('INSERT INTO cities (id, name, province, population) VALUES ($1, $2, $3, $4)',
      [id, name, province, population], (error, results) => {
          if (error) {
            throw error
          }
          response.status(201).send(`City was added with ID: ${results.insertId}`)
        })
  }

  const createAircraft = (request, response) => {
    const {id, type, airline_name, passanger_capicity} = request.body
  
    pool.query('INSERT INTO aircraft (id, type, airline_name, passanger_capicity) VALUES ($1, $2, $3, $4)',
      [id, type, airline_name, passanger_capicity], (error, results) => {
          if (error) {
            throw error
          }
          response.status(201).send(`Aircraft was added with ID: ${results.insertId}`)
        })
  }





  module.exports = {
    getAirPortCitys,
    getPassengerPlane,
    getAllowedAirports,
    getAirportPassengers,
    getAirport,
    createAirport,
    createCity,
    createAircraft,
  }