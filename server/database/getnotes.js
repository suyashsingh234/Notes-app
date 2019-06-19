const collection=require('./models.js').collection;

module.exports=async function(mail){

		 var data=await collection.findOne({'UserEmail' : mail})
        .select('Notes').exec();
		//	console.log(data.Notes);
		return data.Notes;
}
