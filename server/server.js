const express=require('express');
const bodyParser=require('body-parser');
const passport=require('passport');
const session=require('express-session');
const app=express();
const collection=require(__dirname+'/database/models.js').collection;
const PORT=process.env.PORT || 3000;

const path=require('path');
const publicpath=path.join(__dirname,'../public');

app.use(express.static(publicpath));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
	secret:'6GW`hN)S2{',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passportjs/local.js')(passport);
app.use(require('./routes/auth.js')(passport));

app.set('view engine','pug');
app.set('views',path.join(publicpath,'/views'));

// app.use('/',function(err,req,res,next){
// 	if(err)
// 		console.log(err);
// 	else if(req.path=='/')
// 		next();
// 	else if(req.user){
// 		next();
// 	}
// 	else {
// 		res.redirect('/');
// 	}
// });

app.get('/',(req,res)=>{
	if(req.user)
		res.send('dashboard');
	else
		res.sendFile(path.join(publicpath,'/index.html'));
});

app.get('/dashboard',function(req,res){
	res.render('dashboard/dashboard.pug');
});

app.listen(PORT,()=>{
	console.log('Server running on port'+PORT);
});
