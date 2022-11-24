//Continue 14 + logger.js file
//issue with the 14: 
//issue1:the file become busy it's nicer to have the middleware function (logger) in a seperate file
//issue2: what if we have 50 more routes? we don't want to add this function manualy to all of them--we need a method for that

const express = require('express')
const app = express()

//solution for issue1: add a file for logger.js and then export it
//move middleware to logger.js file,export it there and import it here:
const logger = require('./logger')

//solution for issue2: suppose we have more routes than home and about
//we don't want to add logger manually so we use the app.use method instead and we pass the middleware to it
//IMPORTANT NOTE: express is in order so app.use(logger) must be at the top of the .get otherwise we are not receiving answer 
//so middleware function must be first and then you can have all your get methods

app.use(logger)

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

