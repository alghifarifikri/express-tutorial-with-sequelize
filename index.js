require('dotenv').config()

// import library
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./src/router') // import router

// use library
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 
app.use('/controller', routes) // use router agar aktif

app.get('/', (req,res)=>{ 
    res.send('Hello World')
})

app.post('/', (req, res)=>{ 
    res.send(req.body)
})

const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(process.env.APP_PORT, ()=>{ 
    console.log('app Listen on port 4040')
})