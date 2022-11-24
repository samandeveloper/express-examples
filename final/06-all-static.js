//this file is similar to 05-express-app.js but we want to improve it
//if we are sending all the static files to the public folder then we can send all the other apps
//two ways to do it: 1.adding to static assets   2. SSR=server side rendering

const express = require('express')
const app = express()  //invoke express
const path = require('path')  //we are using the path module-it's a built-in module so it's preinstalled


app.use(express.static('./public'))

//homepage
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))  //send the path to the specific directory (__dirname:excuting script is in this) using the sendFile method
// })
//instead of above copy the index.html from navbar-app folder to the public folder

//404 page
app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})

app.listen(5000,()=>{
    console.log(`server is listening on port 5000...`)
})