const express=require('express');
const router=express.Router();
const passport=require('passport');
const bcrypt=require('bcryptjs');
const collection=require('../database/models.js').collection;

module.exports=function(passport){
	//signup
	router.post('/users/signup',function(req,res){
		const email=req.body.email;
		const pass1=req.body.password1;
		const pass2=req.body.password2;
		if(!email || !pass1 || !pass2)
			res.send('Fill all fields');
		else if(pass1!=pass2)
			res.send('Passwords do not match');
		collection.findOne({UserEmail:email},function(err,user){
			if(user)
			{
				res.send('Email already exists');
			}
			else {
				const saltRounds=10;
				bcrypt.hash(pass1, saltRounds, function(err, hash) {
	  			if(!err)
					{
						collection.create({UserEmail:email,Password:hash});
						res.send('Account created succesfully! Go back and log in');
					}
				});
			}
		});
	});

	//log in local Strategy
router.post('/users/login',
  passport.authenticate('local',{failureRedirect: '/errors/login'}),
  function(req, res) {
			const query=encodeURIComponent(req.body.email);
			res.redirect('/dashboard?email='+query);
  });

	return router;
}
