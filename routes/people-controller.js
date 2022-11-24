//32+people.js in controllers folder

const express = require('express')
//instead of app we go with router which comes from express
//below is the way to setup the router
const router = express.Router();

//New: move to people.js in controller folder
// let {people} = require('../data') 

//import the export modules from people.js 
const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')

router.get('/' , getPeople)

//way1: set the methods seperately
// router.post('/', createPerson)

// router.post('/postman', createPersonPostman)

// router.put('/:id', updatePerson)

// router.delete('/:id' , deletePerson)  


//way2:chain the methods using .route('/')
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson)


//exports
module.exports = router