//file number 31
const express = require('express')
//instead of app we go with router which comes from express
//below is the way to setup the router
const router = express.Router();

//New: bring the below line: but add ../ to it since we move the files to routes folder
let {people} = require('../data') 

//change the path and remove the main path ('/api/people') that we have on file number 31 

//copy and paste http methods except the one with '/login' path from the file 30 to here 
//now change the app to router since we want the router handles the routes not the app
router.get('/' , (req,res)=>{
    res.status(200).json({success:true,data:people})  
})

//change the url path from '/api/people' to '/api/people/postman'
router.post('/',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).send({success:true,person:name})
})

//change the url path from '/api/people' to '/api/people/postman'
router.post('/postman',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).send({success:true,data:[...people,name]})
})

router.put('/:id',(req,res)=>{    
    const{id} = req.params   
    const{name} = req.body
    console.log(req.params)  //{ id: '1' }
    console.log(req.params.id)  //1

    const person = people.find((person)=>{
        console.log(person.id)   //1
        console.log(Number(id))  //1
        return person.id === Number(id)   
    })
    if(!person){   
        return res.status(404).json({success:false,msg:`no person with id ${id}`})
    }
    const newPeople = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name    
        }
        return person  
    })
    res.status(200).json({success:true,data:newPeople})
})

router.delete('/:id' , (req,res)=>{
    const person = people.find((person)=>
        person.id === Number(req.params.id))
        if(!person){    //error
            return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
        }
    const newPeople = people.filter((person)=>person.id !== Number(req.params.id))    
    return res.status(200).json({success:true, data:newPeople})
})  


//exports
module.exports = router
