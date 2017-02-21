var express = require('express');
var passport = require('passport');
var jsonwebtoken = require('jsonwebtoken');

var utilRequest = require(__base + 'module/util/utilRequest');
var users = require(__base + 'users');
var config = require(__base + 'config');

// 세션 처리
var passportLocalStrategy = require(__base + 'module/passport/passportLocalStrategy');
// 토큰 처리
var passportJwtStrategy = require(__base + 'module/passport/passportJwtStrategy');


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var user = utilRequest.getUserByRequest(req);
	
	res.render('index', {
		title: 'TEST',
		user: user
	});
});

router.post('/login', passportLocalStrategy.authenticate(), function (req, res, next) {
	res.redirect('/');
});

router.post('/logout', function (req, res, next) {
	req.logout();
	res.redirect('/');
});


router.post('/token', function (req, res, next) {
	if (req.body.username && req.body.password) {
		var username = req.body.username;
		var password = req.body.password;
		
		var user = users.find(function(u) {
			return u.username === username && u.password === password;
		});
		
		if (user) {
			var payload = {
				id: user.id
			};
			
			var token = jsonwebtoken.sign(payload, config.jwtSecret, {expiresIn: 30});
			
			res.json({
				token: token
			})
		} else {
			res.sendStatus(401);
		}
	} else {
		res.sendStatus(401);
	}
});

router.get('/profile', passportJwtStrategy.authenticate(), function (req, res, next) {
	res.json(req.user);
});



module.exports = router;
