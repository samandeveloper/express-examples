//countinue 30
//+people.js+auth.js
const express = require('express')
const app = express()

//New:copy and paste the below line to people.js
// let {people} = require('./data') 

//New: import people and auth here (exports these modules happens in people.js and auth.js)
const people = require('./routes/people')   //same as peole.js
const auth = require('./routes/auth')

app.use(express.static('./methods-public'))  
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//NEW:now we should write a middleware for the main route so in people.js what is the MAIN route? /api/people
//Note:because here we have the path: '/api/people' here we should delete theis path in the methods in people.js and add '/' instead
app.use('/api/people', people)   //main path for/api/people

//New: move the post method with '/login' to the auth.js file inder routes folder
app.use('/login',auth)   //main path for login


app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

