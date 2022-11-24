//Continue 13: 
//solution:we write a middleware function and for the routes that we want we attach it and for the other that we don't want it we don't attach it.
//after writing the function, we add it in between the path and call back function (in second parameter position)

const express = require('express')
const app = express()

//middleware function:
const logger= (req,res,next)=>{  //in middleware we should add req,res,next as parameter //in middleware we MUST have next and pass it to the next middleware unless we want to terminate the whole middleware cycle
    const method = req.method;
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time) 
    //in middleware we have two options: 1.send your data to the browser 2. pass it to the next middleware
    // res.send('Testing')   //option1
    //use next to pass to the next function by invoking next function    //option2
    next()  
}

app.get('/', logger, (req,res)=>{
    res.send('Home')
})

app.get('/about', logger, (req,res)=>{
    res.send('About')
})

app.listen(5000,()=>{
    console.log('Server is listening to port 5000...')
})

