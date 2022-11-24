//continue 26:working with postman tool for api:

const express = require('express')
const app = express()
let {people} = require('./data') 

//static assets
app.use(express.static('./methods-public'))  

//PARSE FORM DATA
app.use(express.urlencoded({extended:false}))

//add middleware
app.use(express.json())

//read data-GET
app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})


app.post('/api/people',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).json({success:true,person:name})
})

//NEW: for postman--we grab the name (like peter) and then we add it to the people array
//go to postman>>set method:post>>select: body,raw, and json>> add a name in json like: {"name":"peter"}>>click send>>see the results
app.post('/api/postman/people',(req,res)=>{
    const{name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    return res.status(201).send({success:true,data:[...people,name]})
})

//POST-for regular tab
app.post('/login',(req,res)=>{
    console.log(req.body)
    //NEW
    const {name} = req.body   
     if(name){  
        return res.status(200).send(`Welcome ${name}`)
     }   //else
    return res.status(401).send('Please Provide Credentials') //401:unauthorized
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

