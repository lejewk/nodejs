/**
 * Created by lejewk on 2017-02-18.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelUser = require('../model/modeluser');

module.exports = (() => {
	// 전략 처리
	var strategy = new LocalStrategy({
		usernameField: 'id',
		passwordField: 'password'
	}, async (id, password, done) => {
		let user = await modelUser.findByUsernameAndPassword(id, password);
		if (user) {
			done(null, {id: id, password: password});
		} else {
			done(null, false, {message: 'login fail'});
		}
	});
	
	passport.use(strategy);
	
	// 세션 기록
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	
	// 페이지 이동시마다 세션을 비교처리
	passport.deserializeUser((user, done) => {
		done(null, user);
	});
	
	return {
		authenticate: () => {
			return passport.authenticate('local', {failureRedirect: '/login/fail'});
		}
	}
})();