//continue 27: PUT method:for updating the data
//like: www.store.com/api/order/:id  >>update specific order(params+send data) 
//www.store.com/api/order/:id is a convention and it can be written other ways

const express = require('express')
const app = express()
let {people} = require('./data') 

//static assets--express.static is build-in module for bringing static files
app.use(express.static('./methods-public'))  

//PARSE FORM DATA--usually comes with post method
app.use(express.urlencoded({extended:false}))

app.use(express.json())

//read data-GET
app.get('/api/people' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})

//post for js tab
app.post('/api/people',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).json({success:true,person:name})
})

//POST-for regular tab
app.post('/login',(req,res)=>{
    console.log(req.body)
    const {name} = req.body  
     if(name){  
        return res.status(200).send(`Welcome ${name}`)
     }   
    return res.status(401).send('Please Provide Credentials') //401:unauthorized
})

//NEW: first the item should be exist to be update
//when we are working with put method like post method we need to send something in body--e.g. if we change the name susan to peter we need to supply this value 
//we need two suplly two parameter 1.params(id) 2. value
app.put('/api/people/:id',(req,res)=>{    //we can call :id whatever we want
    //the two parameters here are id ans name
    const{id} = req.params   //req.params gives us the id
    const{name} = req.body
    // console.log(id,name)
    // res.send('hello world')  //in postman>>put>>json,raw,body>>{"name":"peter"}>>answer:hello world
    //so in postman we send the id in url and the value in the body

    //now we want to get the person we want id, if the id doesn't exist we send back an error and if the id exists then we change the value
    const person = people.find((person)=>{
        return person.id === Number(id)   //if the person id equal to id
    })
    if(!person){   //404:if we can not find the resource
        return res.status(404).json({success:false,msg:`no person with id ${id}`})
    }
    //if the person exist then we should iterate over the array to find the specific person whose id matches the params value and then i will change that person's name
    const newPeople = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name    //person.name is equal to the name that we want (my name)
        }
        return person  //else-return the person
    })
    res.status(200).json({success:true,data:newPeople})

})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

