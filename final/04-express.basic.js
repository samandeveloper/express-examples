//the disadvantage of 03-http-app.js is we should manually set the style,images,etc 
//solution:using express.js which is a node.js web app framework
//express is not one of the build in modules (unlike http)
//with express we can create web applications with node.js

//after installing the express framework
const express = require('express')  //import the module
const app = express()  //invoke the express and send it to a variable
//instead of two lines above we can write: const app = require('express')()

//home page
app.get('/',(req,res)=>{       //what users try to access (root)
    // res.send('Home Page')
    //instead of the above line we can add status to it
    res.status(200).send('Home Page')
})
//about page
app.get('/about',(req,res)=>{
    // res.send('About Page')
    //instead of the above line we can add status to it
    res.status(200).send('About Page')
})
//404 page (not found page)
//The app.all() function is used to route all types of HTTP request. 
//for example if we have POST, GET, PUT, DELETE, etc, request made to any specific route, lets say /user, so instead to defining different API’s like app.post(‘/user’), app.get(‘/user’), etc, we can define single API app.all(‘/user’) which will accept all type of HTTP request.
app.all('*',(req,res)=>{  //all the pages
    // res.send('<h1>resource not found</h1>')
    //instead of the above line we can add status to the send method,since sending 200 status for 404 page is confusing
    res.status(404).send('<h1>resource not found</h1>')
})
app.listen(5000,()=>{  //we add a callback function on listen method to show something
    console.log('server is listening on port 5000...')
})



//NOTE:most famous methods that we use in the express:
//app.get
// app.post
// app.put
// app.delete
//app.all
// app.use  (responsible for middleware)
// app.listen