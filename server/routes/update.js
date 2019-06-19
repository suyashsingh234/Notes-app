const express=require('express');
const router=express.Router();
const mongoose=require('../database/connect.js').mongoose;
const collection=require('../database/models.js').collection;

router.post('/users/update',(req,res)=>{

	//console.log(req.body);
	collection.findOne({UserEmail:decodeURIComponent(req.body.email)},(err,data)=>{

		if(!err){

					if(req.body.find='' || !req.body.find)
					{
						data.Notes.push(req.body.data);
						data.save();
					}
					else{
						var idx=data.Notes.indexOf(req.body.find);
						if(idx==-1)
						{
							data.Notes.push(req.body.data);
							data.save();
						}
						else
						{
							data.Notes[idx]=req.body.data;
							data.save();
						}
					}

				}

			});

	});

router.post('/users/delete',(req,res)=>{
	collection.findOne({UserEmail:decodeURIComponent(req.body.email)},(err,data)=>{
			if(!err)
			{
				var idx=data.Notes.indexOf(req.body.deldata);
				if(idx!=-1)
				{
					data.Notes.splice(idx,1);
					data.save();
				}
			}

	});

});


exports.router=router;
