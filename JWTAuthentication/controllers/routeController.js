const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// module.exports.likes = async(req,res) =>{
//     console.log(req.body);
//     const checkUser = await user.findOne({_id : req.body.id});
//     if(!checkUser){
//         res.status(400).send("User is not registered.");
//     }

//     if(checkUser.jwt == null){
//         res.status(400).send('Token is required to access provate fetaures.');
//     }

//     if(req.body.token == null){
//         res.status(400).send('token is required.');
//     }

//     let userAuth = {};
//     console.log("Started testing");
//     try{
//         userAuth = jwt.verify(req.body.token, 'thisissceretkey');
//         const userfound = await user.findOne({_id : userAuth._id});
//        // console.log(userfound);
//         if(!userfound || userfound._id != req.body.id){
//             console.log('token is not correct.');
//             res.status(400).send('Something is wrong with token');
//         }

//         console.log("Stop testing");
//         res.status(200).send('working fine');

//         const result = await user.findOneAndUpdate({posts:{$elemMatch : {_id: req.body.post_id}}},{$inc : {"posts.$.likes":1}});
//         console.log(result);
//     }catch(err){
//         console.log(err);
//         console.log('stop working');
//         res.status(400).send('token is not valid');
//     }

// }

// module.exports.posts = async(req,res) =>{
//     const checkUser = await user.findOne({_id : req.body.id});
//     if(!checkUser){
//         res.status(400).send('User is not registered.');
//     }

//     if(checkUser.jwt==null){
//         res.status(400).send('Token is required to access private features.')
//     }
//     let userAuth = {};
//     try{
//     userAuth = jwt.verify(req.body.token, "thisissceretkey");
//     const userfound = await user.findOne({_id: userAuth._id});
//     if(!userfound || userfound._id != req.body.id){
//         console.log('token is not correct.');
//         res.status(400).send('Something is wrong with token');
//     }
//     //console.log(userAuth);
//     //console.log(userfound);
//     const result =  await user.updateOne({_id:req.body.id},{$push:{"posts":{"post":req.body.post}}});
//     console.log(result);
//     console.log(userfound);
//     res.status(200).send('Everything is fine, you can post.');
//     }catch(err){
//         console.log(err);
//         console.log('stop working');
//         res.status(400).send('token is not valid');
//     }

//     // console.log(userAuth);
//     // const userfound = await user.findOne({_id: userAuth._id});
//     // if(!userfound || userfound._id != req.body.id){
//     //     console.log('token is not correct.');
//     //     res.status(400).send('Something is wrong with token');
//     // }
//     // res.status(200).send('Everything is fine, you can post.');

// }

module.exports.register_user = async(req,res) =>{
    //console.log(req);
    
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
        name : req.body.name,
        email : req.body.email,
        password : hashPass,
    });
    try{
    const result = await newUser.save();
    console.log(result);
    console.log("Finish executing");
//    alert('User Registered Successfully.');
    
    res.status(200).redirect('login');
    }catch(err){
        console.log('Some Error Occured :', err);
        res.status(400).send(err);
    }
    
}

module.exports.login_user = async(req,res) => {

    console.log('Login Started');
    const userEmail = await user.findOne({email : req.body.email});
    if(!userEmail) {
        res.status(400).send("User not found");
    }


    const checkPass = await bcrypt.compare(req.body.password, userEmail.password);
    if(!checkPass){
        res.status(400).send("Password is incorrect");
    }

    const token = jwt.sign({_id:userEmail._id}, "thisissceretkey");
    res.header('auth-token', token).send(`This JWT token can be used by the user to get his/her personal details. JWT : ${token}. The personal details could b found on /userDetails page.`);

    const result = await user.updateOne({_id: userEmail._id}, {$set: {jwt : token}}, (err, res) =>{
        if(err){
            //console.log('that one');
            console.log(err);
        }
        else{
          //  console.log('this one');
            console.log(res);
        }
    });

    console.log(result);
//    try{
//     const userCheck = jwt.verify(token, "thisissceretkey");
//     const userfound = await user.findOne({_id: userCheck._id});
//     console.log(userfound);
//    }catch(err){
//     console.log(err);
//    }
    //res.send("User logged in successfully.");

}

module.exports.getDetails = async(req, res) => {
    //console.log(req.query);
    console.log(req.body);
    const checkUser = await user.findOne({email : req.body.email});
    console.log(checkUser);
    if(!checkUser){
       res.status(400).send('User is not registered.');
    }

    if(checkUser.jwt==null){
        res.status(400).send('Token is required to access private features.')
    }
    console.log('this happed');
    let userAuth = {};
    try{
        console.log('satreted')
    userAuth = jwt.verify(req.body.token, "thisissceretkey");
    console.log(userAuth);
    //console.log(userAuth);
    const userfound = await user.findOne({_id: userAuth._id});
    console.log(userfound);
    //console.log(userfound);
    if(!userfound || userfound.email != req.body.email){
        console.log('token is not correct.');
        res.status(400).send('Something is wrong with token');
    }
    //console.log(userAuth);
    //console.log(userfound);
    //const result =  await user.updateOne({_id:req.body.id},{$push:{"posts":{"post":req.body.post}}});
    // console.log(result);
    // console.log(userfound);
    res.status(200).send(checkUser);
    }catch(err){
        //console.log(err);
        //console.log('stop working');
        res.status(400).send('token is not valid');
    }


}

module.exports.getSignUpPage = (req,res) => {
    res.render('signup');
}

module.exports.getLoginPage = (req, res) => {
    res.render('login');
}

module.exports.getDetailsPage = (req, res) => {
    res.render('getdetails');
}