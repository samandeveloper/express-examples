//continue 23
//check for the name that we apply in the input and if the name is provided (in people in data.js) then we pass "welcom name of the person".if the name is not in the array list, then we send back 401, please provide credentials

const express = require('express')
const app = express()
let {people} = require('./data') 

//static assets
app.use(express.static('./methods-public'))  

//PARSE FORM DATA
//The express.urlencoded() function is a built-in middleware function in Express (it returns an object).  It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended:false}))   //without this line we receive undefined

//read data-GET
app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})

//POST-in index.html form tag action="/login"
app.post('/login',(req,res)=>{
    //NOTE:The req.body object allows you to access data in a string or JSON object from the client side. You generally use the req. body object to receive data through POST and PUT requests in the Express server.
    console.log(req.body)
    //NEW
    const {name} = req.body
     if(name){  //if name exists--any name even if it is on people array or not
        return res.status(200).send(`Welcome ${name}`)
     }   //else
    return res.status(401).send('Please Provide Credentials') 
})


app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

