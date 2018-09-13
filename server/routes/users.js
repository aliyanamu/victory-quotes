const express = require('express'),
    router = express.Router(),
    { signdulu, checkdulu } = require('../controllers/users');

/* GET users listing. */
router

    .post('/register', signdulu)

    .post('/login', checkdulu)

    // .get('/', echo)
    
    // .post('/', insert)

    // .put('/:id', update)

    // .delete('/:id', remove)

module.exports = router;