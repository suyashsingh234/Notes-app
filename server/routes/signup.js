const express=require('express');
const router=express.Router();

router.get('/users/signup',function(req,res){
	const email=req.query.email;
	const pass1=req.query.password1;
	const pass2=req.query.password2;
	if(!email || !pass1 || !pass2)
		res.send('Fill all fields');
});

exports.router=router;
