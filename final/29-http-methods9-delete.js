//continue 28: Delete method
//e.g. www.store.com/api/orders/:id (can be different). like put method, for delete method we need id
 //similar to put, but when we are deleting we don't expect anything in the body
 //we delete method, we just remove the data that we want from our list
//Important note: if the path are the same in app.get, app.post,app.put and app.delete these requests are different and because the path is the same doesn't mean they are the same

const express = require('express')
const app = express()
let {people} = require('./data') 

//static assets
app.use(express.static('./methods-public'))  

//PARSE FORM DATA
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

//post-for regular tab
app.post('/login',(req,res)=>{
    // console.log(req.body)
    const {name} = req.body  
     if(name){  
        return res.status(200).send(`Welcome ${name}`)
     }   
    return res.status(401).send('Please Provide Credentials') //401:unauthorized
})

//put method
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

//NEW: delete method
app.delete('/api/people/:id' , (req,res)=>{
    //first we look for the person and send back the response, if the person exists we remove the person from array
    //similar to put but here we directly accessing the params objects that's why instead of Number(id) we use 
    //instead of Number(id) in put method, in delete method we should use params like Number(req.params.id)
    const person = people.find((person)=>
        person.id === Number(req.params.id))
        if(!person){    //error
            return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
        }
    //show the ones that their id are not the same (use filter)
    const newPeople = people.filter((person)=>person.id !== Number(req.params.id))    
    return res.status(200).json({success:true, data:newPeople})
})  

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

