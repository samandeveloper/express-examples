//continue from 10-basic-json4.js:
//Query String Parameter = url parameters
//query string parameter is a way to send small amount of information to the server using the url

const express = require('express')
const app = express()
const {products} = require('./data')  //products is array of objects in data.js

//get request on homepage
app.get('/' , (req,res)=>{  
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')   
})

//using express route parameter
app.get('/api/products/:productID',(req,res)=>{
    const{productID} = req.params;    
    const singleProduct = products.find((product)=> product.id === Number(productID))  //convert the string to number
    console.log(singleProduct)   //if we are on http://localhost:5000/api/products/abc then this answer is undefined
    //solution:add if-- if you can't find the id then give us 404
    if(!singleProduct){  //if singleProduct doesn't exist
        return res.status(404).send('product does not exist')
    }
    res.json(singleProduct)  //if everything is correct
})

//make the 09-basic-json3.js more complicate:
app.get('/api/products/:productID/reviews/:reviewID', (req,res)=>{  //we name it review--it's not in data.js
    console.log(req.params)  //answer:{ productID: '2', reviewID: '1' }
    res.send('hello world')  //on browser if we have something like http://localhost:5000/api/products/2/reviews/1 then the answer is hello world
})

//Query string parameter--NOTE:we can add as many query string as we want
app.get('/api/v1/query' , (req,res)=>{   //like api hacker news: http://hn.algolia.com/api/v1/search?query=foo&tags=story but we didn't want to add ? (our choice)
    console.log(req.query)  //in browser http://localhost:5000/api/v1/query and after this address we can add as many query string as we want
    res.send('hello world2')  //in browser http://localhost:5000/api/v1/query/?name=john/?id=4  (any query string that we add after ? we still receive hello world)
    //in browser we don't want name and id this time--we want search and limit (how many product we are getting back)--so we are creating any query that we want
    //in browser http://localhost:5000/api/v1/query/?search=a&limit=2 we receive hello world2 and in terminal: {search:'a',limit:'2'}


})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})
