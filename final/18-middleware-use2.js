//Continue 17+logger.js+authorize1.js :we want to add multiple middlewares in this file
//we add another middleware authorize.js in a seperate file

const express = require('express')
const app = express()
const logger = require('./logger')
const authorize1 = require('./authorize1')

app.use([logger,authorize1])  //if http://localhost:5000/ answer is unauthorized but if http://localhost:5000/?user=john the answer is home


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

// NOTE: console.log(req.user) show that in any of the .get above we have access to req.user