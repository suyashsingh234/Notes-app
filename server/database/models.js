const mongoose=require(__dirname+'/connect.js').mongoose;
const NotesSchema=new mongoose.Schema({
	content:'string'
});
const schema=new mongoose.Schema({
	UserEmail:'string',
	Password:'string',
	Notes:[NotesSchema]
});
const collection=mongoose.model('collection',schema,'collection');
exports.collection=collection;
