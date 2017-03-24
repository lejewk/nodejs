var express = require('express');
var passport = require('passport');
var utilJwt = require('../module/util/utilJwt');

var utilRequest = require('../module/util/utilRequest');
var users = require('../users');
var config = require('../config');
var modelUser = require('../module/model/modelUser');


// 세션 처리
var passportLocalStrategy = require('../module/passport/passportLocalStrategy');
// 토큰 처리
var passportJwtStrategy = require('../module/passport/passportJwtStrategy');


/**
 * async await 사용시 추가 필요.
 */
var asyncify = require('express-asyncify');
var router = asyncify(express.Router());
require("babel-polyfill");


/* GET home page. */
router.get('/', (req, res, next) => {
	var user = utilRequest.getUserByRequest(req);
	
	res.render('index', {
		title: 'TEST',
		user: user
	});
});

router.post('/login', passportLocalStrategy.authenticate(), (req, res, next) => {
	res.redirect('/');
});

router.get('/login/fail', (req, res, next) => {
	res.redirect('/');
});

router.post('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
});


router.post('/token', async (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	
	var user = await modelUser.findByUsernameAndPassword(username, password);
	
	if (user) {
		var payload = {
			id: user.id
		};
		
		var token = utilJwt.sign(payload);
		
		res.json({
			token: token
		})
	} else {
		res.sendStatus(401);
	}
});

router.get('/profile', passportJwtStrategy.authenticate(), (req, res, next) => {
	res.json(req.user);
});



module.exports = router;
