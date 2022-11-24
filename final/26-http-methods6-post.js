//continue 24:javascript tab--add js tab to the previous file
// go to methods-public and then javascript.html which is the saame app but in js-in browser on navbar we have "regular" and "javascript"
//you can chose js here. we are working on js here
//in javascript.html file unlike the index.html file, we don't have action or method in form but we have the name attribute
//in js file we use axios instead of fetch which is wasier but it needs installation
//in axios we can see that the path is /api/people which is the same path in get method in this file--these two urls must match otherwise we receive an error
//in js file,also in try and catch section the method on axios is post on /api/people because we are sending the post request. also name is the value as a second argument
//also in js file in catch you receive error if we submit the button with empty input in :formAlert.textContent = error.response.data.msg
//in js tab on homepage we want to add the name value that we enter in the input, under the submit beside other names

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


//NEW: add data for js file-POST-javascript tab
//I have the input value and i pass it as a name property
//note that app.get and app.post are different even though that the url are the same
app.post('/api/people',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    // res.status(201).send('Success')    //if we are doing post request and we are successful we use 201--in js tab on browser if we add name in input, on network tab we receive people and 201
    //instead of above line we can write:
    res.status(201).json({success:true,person:name})
})

//POST-for regular tab
app.post('/login',(req,res)=>{
    //NOTE:The req.body object allows you to access data in a string or JSON object from the client side. You generally use the req. body object to receive data through POST and PUT requests in the Express server.
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

