/**
 * Created by lejewk on 2017-02-20.
 */

module.exports = {
	// token 암호화키
	jwt : {
		secret: "happytuk@5377@3813!jwt",
		jwtExp1H : 3600
	},
	
	// local session 정보
	localSessionOption: {
		secret: 'happytuk@5377@3813!local',
		resave: false,
		saveUninitialized: true
	}
};