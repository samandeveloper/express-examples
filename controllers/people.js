//file number 32+people-controller.js in routes+auth.js in routes
//the benefit is that our route file is much cleaner

let {people} = require('../data') 

//for get request we call it getPeople-we also need to have access to req and res
const getPeople = (req,res) =>{
    res.status(200).json({success:true, data:people})
}

const createPerson = (req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).send({success:true,person:name})
}

const createPersonPostman = (req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).send({success:true,data:[...people,name]})
}

const updatePerson = (req,res)=>{    
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
}


const deletePerson = (req,res)=>{
    const person = people.find((person)=>
        person.id === Number(req.params.id))
        if(!person){    //error
            return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
        }
    const newPeople = people.filter((person)=>person.id !== Number(req.params.id))    
    return res.status(200).json({success:true, data:newPeople})
}

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}