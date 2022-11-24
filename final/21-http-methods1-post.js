//NEW TOPIC: http methods: GET,POST,PUT,DELETE + methods-public folder
//up to now we just talk about GET. we are going to work with the rest of them.
//for this purpose we use the people array in data.js

const express = require('express')
const app = express()
let {people} = require('./data')  //since we are going to modify the people array we use let

//add data to the server(insert data)-POST
//we can not easily perform the POST request. so we first use the static asset (express middleware) to do that
app.use(express.static('./methods-public'))  //give the path--methods-public file is a ready project--on http://localhost:5000/ we receive a new project

//read data-GET
app.get('/' , (req,res)=>{
    res.status(200).json({success:true,data:people})  //if http://localhost:5000/ the answer is an object of success:true and data:array of object for people 
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

// Note: check the index.html in methods-public >> the form tag: <form action="/login" method="POST">
//go to the browser homepage: http://localhost:5000/ and in the enter name input type a name >> you will receive "cannot post/login"
 //if you remember in GET method the the header is mandetory but the body is optional
 //but in POST method we should add the body 