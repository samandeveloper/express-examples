//continue 21
const express = require('express')
const app = express()
let {people} = require('./data')  //since we are going to modify the people array we use let

//static assets
app.use(express.static('./methods-public'))   //means on HOMEPAGE we will receive the form

//read data-GET
app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  //if http://localhost:5000/ the answer is an object of success:true and data:array of object for people 
})

//POST-/login is the action attribute in form in index.html (also there is the post method attribute there)
app.post('/login',(req,res)=>{
    res.send('POST')  //on homepage type a name in input it will directs you to http://localhost:5000/login and the answer is POST
    //but we still don't have access to the people array in data.js >> solution on file 23
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

