//in 07-basic-json.js we show the first product with id 1 but what if we want to show many products with different ids
//solution: using "express route parameter"  => :name

const express = require('express')
const app = express()
const {products} = require('./data')  //products is array of objects in data.js

app.get('/' , (req,res)=>{  
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')   
})

//using express route parameter
app.get('/api/products/:productID',(req,res)=>{
    // console.log(req)
    // console.log(req.params)   //answer: {productID:'1'}--NOTE: req.params gives us the number but it is in string
    const{productID} = req.params;    //one of the methods on req is params
    const singleProduct = products.find((product)=> product.id === Number(productID))  //convert the string to number
    res.json(singleProduct)  //answer: http://localhost:5000/api/products/ we can add 1,2,3,4 at the end of the url in browser and get different products
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})

