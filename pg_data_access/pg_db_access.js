const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'QAP1',
    password:'jordan1234',
    port:5433
})

const getAirPortCitys = (request, response) => {
    pool.query('select * from cities c, airports a,  city_airports ca where ca.city_id = c.id and ca.airport_id = a.id order by c.id ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getAirPortCitys
  }