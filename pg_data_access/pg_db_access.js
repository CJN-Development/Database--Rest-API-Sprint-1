const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'QAP1',
    password:'jordan1234',
    port:5433
})


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



  module.exports = {
    getAirPortCitys,
    getPassengerPlane,
    getAllowedAirports,
  }