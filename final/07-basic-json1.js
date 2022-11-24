//Way1:Using API in express.js
//up to now in js and react we receive data from api using fetch but here we are responsible for sending out the responses
//sending back json data to server
//for this purpose we need to setup the http request

//we need to work with data.js file with this file
const express = require('express')
const app = express()
const {products} = require('./data')  //products is array of objects in data.js

app.get('/' , (req,res)=>{  //we may omit the status just for convienient
    //read:https://expressjs.com/en/4x/api.html#res.json
    // res.json([{name:'john'},{name:'susan'}])    //the parameter inside res.json([]) can be string,object,boolean,etc.
    // res.json(products)   //products from data.js
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')   //now instead of sending json we will send the home page
})

//to receive an answer from /api/products:
app.get('/api/products',(req,res)=>{
    //below: because we don't want all the properties in the products in data.js (e.g. we don't want desc) so instead of res.json(products) we can write:
    const newProducts = products.map((product)=>{
        const{id,name,image} = product;
        return{id,name,image}
    })
    res.json(newProducts)   //answer: on http://localhost:5000/api/products we receive json file without desc
})

//if we just want the product with id=1
app.get('/api/products/1',(req,res)=>{
    //instead of map we use find method which gives the first item that has the condition
    const singleProduct = products.find((product)=> product.id === 1)
    res.json(singleProduct)   //on http://localhost:5000/api/products/1 we receive json of the first product
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})