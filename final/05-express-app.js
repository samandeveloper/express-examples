//we want to do the navbar project that we have done on 03-http-app.js this time with express to see how easy it will become
const express = require('express')
const app = express()  //invoke express
const path = require('path')  //we are using the path module-it's a built-in module so it's preinstalled and we don't have to install it

//for the style and images solution instead of manually add them we can use express using app.use
//for this purpose we need to gather all the static files (images,style,etc) in one folder like public
//then copy logo.svg,browser-app.js and styles.css to public folder
//setup static and middleware-static is a method
//javascript file is also static file (although js make a site dynamic on the server side it's static) and should be send to public folder
app.use(express.static('./public'))

//homepage
app.get('/',(req,res)=>{
    //below we can use path.resolve or path.join
    //Express provides a method in the response object of the router called sendFile() that can be used to serve static files.
    //res.sendFile() method accepts absolute paths only. You can use express.static() to set the path.
    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))  //send the path to the specific directory (__dirname:excuting script is in this) using the sendFile method
})
//404 page
app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})

app.listen(5000,()=>{
    console.log(`server is listening on port 5000...`)
})