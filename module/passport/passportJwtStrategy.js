/**
 * Created by lejewk on 2017-02-20.
 */

var passport = require('passport');
var Strategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var users = require(__base + 'users');
var config = require(__base + 'config');

var options = {
	secretOrKey : config.jwtSecret,
	jwtFromRequest : ExtractJwt.fromAuthHeader()
};

module.exports = (function() {
	// 전략 구성
	var strategy = new Strategy(options, function(payload, done) {
		var user = users.find(function(u) {
			return u.id === payload.id;
		});
		
		if (user) {
			done(null, {
				id: user.id,
				name: user.name
			});
		} else {
			done(new Error('User not found'), null);
		}
	});
	
	passport.use(strategy);
	
	return {
		authenticate: function() {
			return passport.authenticate('jwt', {
				session: false
			});
		}
	}
})();