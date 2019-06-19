const express=require('express');
const bodyParser=require('body-parser');
const passport=require('passport');
const session=require('express-session');
const app=express();
const notes=require('./database/getnotes.js').notes;
const PORT=process.env.PORT || 3000;
const path=require('path');
const publicpath=path.join(__dirname,'/../public');
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
app.use(require('./routes/update.js').router);

app.set('view engine','pug');
app.set('views',__dirname+'../public/views');

app.use('/',function(req,res,next){
		if(req.path=='/' && req.user)
			res.redirect('/dashboard');
		else if(req.user || req.path=='/'){
			next();
		}
		else if(req.path=='/users/login' || req.path=='/users/signup' || req.path=='/errors/login')
			next();
		else{
			res.redirect('/');
		}
});

app.get('/logout',function(req,res){
	req.session.destroy(function(err){
		res.redirect('/');
	});
});

app.get('/',function(req,res){
		res.sendFile(publicpath+'/home/index.html');
});

app.get('/dashboard',async function(req,res){
	var notes=await require('./database/getnotes.js')(decodeURIComponent(req.query.email));
	//console.log('notes->'+notes);
	res.render(publicpath+'/views/dashboard/dashboard.pug',{notes:notes})
}
);


app.get('/errors/login',function(req,res){
	res.sendFile(publicpath+'/errors/loginError.html');
});


app.listen(PORT,()=>{
	console.log('Server running on port'+PORT);
});
