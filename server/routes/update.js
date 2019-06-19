const express=require('express');
const router=express.Router();
const mongoose=require('../database/connect.js').mongoose;
const collection=require('../database/models.js').collection;

router.post('/users/update',(req,res)=>{
	//console.log(req.body);
	collection.findOne({UserEmail:req.body.email},(err,data){
		if(!err){
				
		}
	});

});

exports.router=router;
