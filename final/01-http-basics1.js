//create server using http module
const http = require('http')

//there is a call back server below-to call the function everytime users hit the server
const server = http.createServer((req,res)=>{
    console.log('user hit the server')
    // console.log(req)   //gives us a huge object
    // console.log(req.method)   //GET
    // console.log(req.url)   // / (means homepage)
    

    //according to the above line we should say:
    if(req.url === '/'){  //on homepage
        //we pass the headers like below with writeHead method--200 is status code--in {} name the file
        //below line is that we describe to the browser what we are sending back e.g. sending html,image,...
        res.writeHead(200,{'content-type': 'text/html'})

        //NOTE: we always need to use the .end method in the server
        //this res.end() says to server that all the header and body send to you
        // res.end('home page')
        //way1:
        // res.end('<h1>home page</h1>')

        //way2: using res.write and we mshould use res.end() always after it
        res.write('<h1>home page</h1>')
        res.end()
    }else if(req.url === '/about'){         //about page
        res.writeHead(200,{'content-type': 'text/html'})
        res.write('<h1>about page</h1>')
        res.end()
    }else{   //if non of the above match->404
        res.writeHead(404,{'content-type': 'text/html'})
        res.write('<h1>page not found</h1>')
        res.end()
    }
})

//.listen method is available when we invoke create server
server.listen(5000)
