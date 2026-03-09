const express = require('express');

const UserController = require('../controllers/user-controller');
const {validateRequestValidator} = require('../middlewares/index');

const router = express.Router();

router.post('/signup',
    validateRequestValidator.validateUserAuth,
    UserController.create
);

router.post('/signin',
    validateRequestValidator.validateUserAuth,
    UserController.signIn
);

router.get('/isauthenticated',
     UserController.isAuthenticated
);

router.get('/', (req,res)=>{
    console.log("haii");
    return res.status(200).json({message:"hlo pglus"});
});

router.get('/isadmin',
    validateRequestValidator.validateIsAdmin,
    UserController.isAdmin
);

module.exports = router;