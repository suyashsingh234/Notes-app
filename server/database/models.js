const mongoose=require(__dirname+'/connect.js').mongoose;
const schema=new mongoose.Schema({
	UserEmail:'string',
	Password:'string',
	Notes:[String]
});
const collection=mongoose.model('collection',schema,'collection');
exports.collection=collection;
