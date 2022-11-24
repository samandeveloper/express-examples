//New topic: middleware in express
//middleware are functions that execute during the request to the server
//each middleware function has access to request and response objects  
//request=>middleware=>response

const express = require('express')
const app = express()

//scenario: we have two routes (home and about)
app.get('/',(req,res)=>{
    const method = req.method;
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time)  //terminal answer: GET/2022 
    res.send('Home')
})

app.get('/about',(req,res)=>{
    res.send('About')
})

app.listen(5000,()=>{
    console.log('Server is listening to port 5000...')
})

//issue: if we want to have the same logic that we write in homepage in about page, then we should copy and paste it in about too.
//what if we have 15 routes instead of 2 routes, then we should repeat our selfs.
//solution: write one function for all the routes. go to 14