//this file works with index.html which is under the 02-express-tutorial
//create server using http module
const http = require('http')
const {readFileSync} = require('fs')

//get all the files--get the content--we require index.html file when we instantiate our server
//we are requesting this once not every time in the if loop-that's why we use readFileSync
const homePage = readFileSync('./index.html')


const server = http.createServer((req,res)=>{
    console.log('user hit the server')

    if(req.url === '/'){  //on homepage
        res.writeHead(200,{'content-type': 'text/html'})  //test for text/plain instead of text/html
        res.write(homePage)
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


server.listen(5000)
