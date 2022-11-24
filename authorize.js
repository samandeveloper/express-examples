//create a function similar to logger.js
const authorize = (req,res,next) =>{
    console.log('authorize')
    next()
}

module.exports = authorize