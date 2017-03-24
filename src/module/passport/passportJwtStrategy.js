/**
 * Created by lejewk on 2017-02-20.
 */

var passport = require('passport');
var Strategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('../../config');

var modelUser = require('../model/modeluser');

var options = {
	secretOrKey : config.jwt.secret,
	jwtFromRequest : ExtractJwt.fromAuthHeader()
};

module.exports = (() => {
	// 전략 구성
	var strategy = new Strategy(options, async (payload, done) => {
		let user = await modelUser.findById(payload.id);
		
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
		authenticate: () => {
			return passport.authenticate('jwt', {
				session: false
			});
		}
	}
})();