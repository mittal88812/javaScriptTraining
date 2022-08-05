const router = require('express').Router();
const routeController = require('../controllers/routeController');


// router.post('/register', (req,res)=>{
//     res.send("Working fine");
// });
// router.post('/likes', routeController.likes);

// router.post('/posts', routeController.posts);

router.get('/register', routeController.getSignUpPage);

router.post('/register', routeController.register_user);

router.post('/login', routeController.login_user);

router.get('/login', routeController.getLoginPage);

router.post('/userDetails', routeController.getDetails);

router.get('/userDetails', routeController.getDetailsPage);

module.exports = router;