const collection=require('./models.js').collection;
var arr=[];
module.exports=function(mail){
	collection.findOne({UserEmail:mail},function(err,data){
			arr=data.Notes;
	});
	return arr;
}
