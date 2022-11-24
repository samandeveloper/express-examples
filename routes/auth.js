//31
const express = require('express')
//user auth instead of app
const router = express.Router()


//change the app to router--replace the /login path to / 
router.post('/',(req,res)=>{
    // console.log(req.body)
    const {name} = req.body  
     if(name){  
        return res.status(200).send(`Welcome ${name}`)
     }   
    return res.status(401).send('Please Provide Credentials') //401:unauthorized
})

//exports
module.exports = router