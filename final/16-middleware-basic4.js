//Continue 15+logger.js
//improve it with only apply the middleware to some get methods

const express = require('express')
const app = express()
const logger = require('./logger')

//improve: we can add path to below
//adding api here as a path will affect the /api/products and /api/items not / and/about
//means we receive the GET /api/products 2022 and GET /api/items 2022 in terminal just for http://localhost:5000/api/products/ and http://localhost:5000/api/items/
//means that logger WILL ONLY APPLY TO ANY ROUTE AFTER  /api
//if we omit the /api path then it will apply to all the routes
//read :https://expressjs.com/en/4x/api.html#app.use
app.use('/api', logger)

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

