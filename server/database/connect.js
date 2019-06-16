const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://suyash:passpass@cluster0-spr3m.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true}).catch(
	err=>{
		console.log(err);
	}
);

exports.mongoose=mongoose;
