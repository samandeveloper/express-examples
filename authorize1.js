//we want to improve this file and add Query String to it
const authorize1 = (req,res,next) =>{
    const {user} = req.query;  //means that query (after ?) must be john
    if(user === 'john'){  
        req.user = {name:'john', id:3}
        next()
    }
    else{
        res.status(401).send('Unauthorized')
    }
}

module.exports = authorize1