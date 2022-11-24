//Continue 16+logger.js+authorize.js :we want to add multiple middlewares in this file
//we add another middleware authorize.js in a seperate file
const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

//below is the way to add multiple middlewars in app.use is to add the middlewars in the array
app.use([logger,authorize])  //answer: e.g. GET /about 2022 authorize
// NOTE: if we change the order:
// app.use([authorize,logger]) //answer: e.g. authorize GET /about 2022 

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
    res.send('Items')
})

app.listen(5000,()=>{
    console.log('Server is listening to port 5000...')
})

