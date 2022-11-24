//now instead of using index.html under the 02-express-tutorial we use the index.html under the navbar-app
//we want to deploy the navbar project
//if we just change the path below, we receive some text without image and style on localhost:5000
//the issue is we didn't call the href (except href for awsome font because it's external resource) and src 
//solution: manually request all the src and href
const http = require('http')
const {readFileSync} = require('fs')

//get all files
const homePage = readFileSync('./navbar-app/index.html')  //change the path
//solution: manually request all the src and href
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req,res)=>{
    console.log('user hit the server')

    if(req.url === '/'){  //on homepage
        res.writeHead(200,{'content-type': 'text/html'})  
        res.write(homePage)
        res.end()

    }
    else if(req.url === '/about'){         //about page
        res.writeHead(200,{'content-type': 'text/html'})
        res.write('<h1>about page</h1>')
        res.end()

    }
    else if(req.url === '/styles.css'){         //styles
        res.writeHead(200,{'content-type': 'text/css'})
        res.write(homeStyles)
        res.end()

    }
    else if(req.url === '/logo.svg'){         //logo
        res.writeHead(200,{'content-type': 'image/svg+xml'})
        res.write(homeImage)
        res.end()

    }
    else if(req.url === '/browser-app.js'){         //logic-our javascript
        res.writeHead(200,{'content-type': 'text/javascript'})
        res.write(homeLogic)
        res.end()

    }
    else{   //if non of the above match->404
        res.writeHead(404,{'content-type': 'text/html'})
        res.write('<h1>page not found</h1>')
        res.end()
    }
})


server.listen(5000)
