const express = require('express')
const bodyParser = require('body-parser')

const restAPP = express()

const pgDBAccessLayer = require('./pg_data_access/pg_db_access')
const port = 3000;

restAPP.use(bodyParser.json())
restAPP.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

restAPP.get('/', (request,response)=>{
    response.json({info: 'Node.Js, Express, and Postgres API'})
})


restAPP.get('/airportcitys', pgDBAccessLayer.getAirPortCitys)
restAPP.get('/passengerplane', pgDBAccessLayer.getPassengerPlane)
restAPP.get('/allowedairports', pgDBAccessLayer.getAllowedAirports)




restAPP.listen(port, ()=>{
    console.log(`App Is Running on port ${port}.`)
})