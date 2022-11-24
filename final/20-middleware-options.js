//Continue 19+logger.js+authorize1.js 
//add morgan package (one of the famous middlewares) as the third party middleware

const express = require('express')
const app = express()
const logger = require('./logger')
const authorize1 = require('./authorize1')
const morgan = require('morgan')   //third party middleware

// app.use([logger,authorize1])  //if http://localhost:5000/ answer is unauthorized but if http://localhost:5000/?user=john the answer is home

app.use(morgan('tiny'))  //assign the morgan to app.use

app.get('/', (req,res)=>{
    res.send('Home')
})

app.get('/about', (req,res)=>{
    res.send('About')
})

app.get('/api/products', (req,res)=>{
    res.send('Products')
})

app.get('/api/items', (req,res)=>{
    console.log(req.user)  //if http://localhost:5000/api/items?user=john answer is items and in terminal: GET /api/items?user=john 2022 { name: 'john', id: 3 }
    res.send('Items')
})

app.listen(5000,()=>{
    console.log('Server is listening to port 5000...')
})

//on homepage:http://localhost:5000/  >> terminal answer: GET / 200 4 - 14.895 ms
//on morgan npm site: Using a predefined format string morgan('tiny') or morgan(':method :url :status :res[content-length] - :response-time ms')