//New section: express router
//when we add many routes our app become very busy like 29
//solution: using express router-- it will group the routers and set them up as seperate controllers
//this common setup is called mvc (modal view controller) which is a pattern when we are setting up the api
//mvc should be connect to database--but for now we are reading from internal file

//below we will create a group for /api/people because it is repeating constantly but in the seperate file--create routes folder
//inside routes folder create files like: auth.js (for login), people.js

const express = require('express')
const app = express()
let {people} = require('./data') 

app.use(express.static('./methods-public'))  
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//New: we have the below part before but we move it on the top of the methods
app.post('/login',(req,res)=>{
    // console.log(req.body)
    const {name} = req.body  
     if(name){  
        return res.status(200).send(`Welcome ${name}`)
     }   
    return res.status(401).send('Please Provide Credentials') //401:unauthorized
})

app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})

//New: change the url path from '/api/people' to '/api/people/postman'
app.post('/api/people/postman',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).json({success:true,person:name})
})

app.put('/api/people/:id',(req,res)=>{    
    const{id} = req.params   
    const{name} = req.body
    console.log(req.params)  //{ id: '1' }
    console.log(req.params.id)  //1

    const person = people.find((person)=>{
        console.log(person.id)   //1
        console.log(Number(id))  //1
        return person.id === Number(id)   
    })
    if(!person){   //error
        return res.status(404).json({success:false,msg:`no person with id ${id}`})
    }
    //map through the array and show the ones that their ids are the same
    const newPeople = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name    
        }
        return person  
    })
    res.status(200).json({success:true,data:newPeople})
})


app.delete('/api/people/:id' , (req,res)=>{
    const person = people.find((person)=>
        person.id === Number(req.params.id))
        if(!person){    //error
            return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
        }
    const newPeople = people.filter((person)=>person.id !== Number(req.params.id))    
    return res.status(200).json({success:true, data:newPeople})
})  

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

