const passport=require('passport');
const bcrypt=require('bcrypt');
const LocalStrategy=require('passport-local').Strategy;
const collection=require('../database/models.js').collection;

module.exports=function(passport){
		passport.use('local',new LocalStrategy({
			usernameField:'email',
			passwordField:'password'
		},function(email, password, done) {
			collection.findOne({
					UserEmail: email
			}, function(err, user) {
					if (err) return done(err);
					if (!user) return done(null, false);
					bcrypt.compare(password, user.Password).then(function(res) {
						if(res==false)
							return done(null,false);
					});
					return done(null, user);
			 });
			}));
			passport.serializeUser(function(user, done) {
			    done(null, user.id);
			});
			passport.deserializeUser(function(id, done) {
			  collection.findById(id, function(err, user) {
			    done(err, user);
			  });
			});
}
