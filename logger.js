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

//we need to export it since we seperate this middle ware function
module.exports = logger