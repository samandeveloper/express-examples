//in 08-basic-json2.js we successfully receive any products from data.js using their id without repeating the code
//issue: if on browser instead of the id we type something else like: http://localhost:5000/api/products/abc
//solution: add if statement

const express = require('express')
const app = express()
const {products} = require('./data')  //products is array of objects in data.js

app.get('/' , (req,res)=>{  
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')   
})

//using express route parameter
app.get('/api/products/:productID',(req,res)=>{
    const{productID} = req.params;    
    const singleProduct = products.find((product)=> product.id === Number(productID))  //convert string to number
    console.log(singleProduct)   //if we are on http://localhost:5000/api/products/abc then this answer is undefined
    //solution:add if-- if you can't find the id then give us 404
    if(!singleProduct){  //if singleProduct doesn't exist
        return res.status(404).send('product does not exist')
    }
    res.json(singleProduct)  //if everything is correct
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})
