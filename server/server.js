const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',require(__dirname+'/routes/login.js').router);
app.use('/',require(__dirname+'/routes/signup.js').router);

app.get('/',(req,res)=>{
	res.sendFile('index.html');
});


app.listen(PORT,()=>{
	console.log('Server running on port'+PORT);
});
