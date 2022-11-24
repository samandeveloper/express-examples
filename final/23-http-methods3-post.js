//continue 22
const express = require('express')
const app = express()
let {people} = require('./data') 

//static assets
app.use(express.static('./methods-public'))  

//solution:PARSE FORM DATA--express.urlencoded() is a built-in middleware function. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended:false}))

//read data-GET
app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})

//POST
app.post('/login',(req,res)=>{
    //because we add the solution, now we have access to the body
    console.log(req.body)  //in homepage type susan in input >> terminal answer:[Object: null prototype] { name: 'susan' }
    res.send('POST') 
    //but we still don't have access to the people array in data.js >> solution read:https://expressjs.com/en/4x/api.html#express.urlencoded
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

