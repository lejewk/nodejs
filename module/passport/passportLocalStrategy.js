/**
 * Created by lejewk on 2017-02-18.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = (function() {
	// 전략 처리
	var strategy = new LocalStrategy({
		usernameField: 'id',
		passwordField: 'password'
	}, function(id, password, done) {
		if (id == 'wook' && password == 'wook') {
			done(null, {id: id, password: password});
		} else {
			done(null, false, {message: 'login fail'});
		}
	});
	
	passport.use(strategy);
	
	// 세션 기록
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	
	// 페이지 이동시마다 세션을 비교처리
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
	
	return {
		authenticate: function() {
			return passport.authenticate('local', {failureRedirect: '/users'});
		}
	}
})();