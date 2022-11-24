//continue from 11-params-query.js:
const express = require('express')
const app = express()
const {products} = require('./data')  

//get request on homepage
app.get('/' , (req,res)=>{  
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')   
})

//using express route parameter
app.get('/api/products/:productID',(req,res)=>{
    const{productID} = req.params;    
    const singleProduct = products.find((product)=> product.id === Number(productID))  //convert the string to number
    console.log(singleProduct)   
    if(!singleProduct){  
        return res.status(404).send('product does not exist')
    }
    res.json(singleProduct)  
})

//make the 09-basic-json3.js more complicate:
app.get('/api/products/:productID/reviews/:reviewID', (req,res)=>{  
    console.log(req.params)  
    res.send('hello world')  
})

//Query string parameter--NEW SECTION
app.get('/api/v1/query' , (req,res)=>{      //like api hacker news: http://hn.algolia.com/api/v1/search?query=foo&tags=story  but we didn't want to add ? 
    // console.log(req.query)  //in browser http://localhost:5000/api/v1/query and after this address we can add as many query strings as we want
    const {search ,limit}= req.query
    let sortedProducts = [...products]
    
    if(search){ //if search exists in the url in browser
        sortedProducts =sortedProducts.filter((product)=>{
            return product.name.startsWith(search)  //filter all the products to a product starts with search
        })
    }
    if(limit){  //if limit exists in the url
        sortedProducts = sortedProducts.slice(0,Number(limit)) //use Number to convert string (limit) to Number
    }
    //issue: if : http://localhost:5000/api/v1/query?search=b we receive []
    //solution: add length to the data
    if(sortedProducts.length < 1){ //if the array length is 0 then  this is successful but we can't return any array
        //way1:
        // res.status(200).send('no products matched your search')  //we can't say it's 404--we just don't have any array left
        //so now if:http://localhost:5000/api/v1/query?search=b answer:no products matched your search
        //way2: more common way 
        return res.status(200).json({success:true, data:[]})  //see the NOTE at the bottom of the page

    }
    return res.status(200).json(sortedProducts)    //see the NOTE at the bottom of the page--adding return is not critical here since we have no more condition after this one
    //if refresh we see http://localhost:5000/api/v1/query/ we receive all the data.js--means we receiive all the produvts because user didn't insert the search and limit
    //if adding limit: http://localhost:5000/api/v1/query?limit=2 it will show the first two products (id=1 and id=2)
    //if http://localhost:5000/api/v1/query?limit=abc we will receive []
    //if adding search and limit: http://localhost:5000/api/v1/query?search=a&limit=2 (receive 2 products id=1 and id=3)
    
    // res.send('hello world2')  


})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})


// NOTE1: if we don't use return in the if statement above then javascript keep reading the answer and express become confuse and then we will receive the error
//e.g. http://localhost:5000/api/v1/query?search=b  //answer in browser:  {
// success: true,
// data: [ ]
// }       
//answer in terminal : Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//solution: add RETURN to have ONLY ONE RESPONSE PER REQUEST
//CONCLUSION: IF YOU ARE SETTING UP A CONDITION IN EXPRESS ALWAYS ADD RETURN 

//NOTE2: IF NO QUERY EXIST IN THE PRODUCT I ALWAYS BACK ALL THE PRODUCTS ANYWAY 
//IF NO QUERY STRING PARAMETERS ARE THERE THEN SEND BACK THE WHOLE PRODUCT