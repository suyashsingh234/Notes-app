const passport=require('passport');
const bcrypt=require('bcryptjs');
const LocalStrategy=require('passport-local').Strategy;
const collection=require('../database/models.js').collection;

module.exports= function(passport){
		passport.use('local',new LocalStrategy({
			usernameField:'email',
			passwordField:'password'
		},function(email, password, done) {
			collection.findOne({
					UserEmail: email
			}, async function(err, user) {
					if (err) return done(err);
					if (!user) return done(null, false);
					var isauth= await bcrypt.compare(password, user.Password);
					if(!isauth){
							return done(null,false);
					}
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
