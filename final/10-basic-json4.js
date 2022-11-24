//continue from 09-basic-json3.js:
//we want to show that express route parameter can be more complecated

const express = require('express')
const app = express()
const {products} = require('./data')  //products is array of objects in data.js

app.get('/' , (req,res)=>{  
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')   
})

//using express route parameter
app.get('/api/products/:productID',(req,res)=>{
    const{productID} = req.params;    
    const singleProduct = products.find((product)=> product.id === Number(productID))  //convert the string to number
    console.log(singleProduct)   //if we are on http://localhost:5000/api/products/abc then this anwser is undefined
    //solution:add if-- if you can't find the id then give us 404
    if(!singleProduct){  //if singleProduct doesn't exist
        return res.status(404).send('product does not exist')
    }
    res.json(singleProduct)  //if everything is correct
})

app.get('/api/products/:productID/reviews/:reviewID', (req,res)=>{  
    console.log(req.params)  //answer:{ productID: '2', reviewID: '1' }
    res.send('hello world')  //on browser if we have something like http://localhost:5000/api/products/2/reviews/1 then the answer is hello world
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})
