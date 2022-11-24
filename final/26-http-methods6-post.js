//continue 25
const express = require('express')
const app = express()
let {people} = require('./data') 

//static assets--express.static is build-in module for bringing static files
app.use(express.static('./methods-public'))  

//PARSE FORM DATA--usually comes with post method
app.use(express.urlencoded({extended:false}))

//NEW:add middleware--we are handling the form submition but we also want to handle the json data--for index.html we don't need this
//express.json() which is a built-in middleware function in express and it parses incoming JSON requests and puts the parsed data in req.
//usually comes with post method
app.use(express.json())

//read data-GET
app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})

//add data for js file-POST-javascript tab
app.post('/api/people',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    // res.status(201).send('Success')   
    res.status(201).json({success:true,person:name})
})

//POST-for regular tab
app.post('/login',(req,res)=>{
    console.log(req.body)
    //NEW
    const {name} = req.body   //name is a key here. req.body let us access to the form tag value in index.js
     if(name){  //if name exists--any name even if it is on people array or not
        return res.status(200).send(`Welcome ${name}`)
     }   //else
    return res.status(401).send('Please Provide Credentials') //401:unauthorized
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

