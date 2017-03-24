/**
 * Created by lejewk on 2017-02-21.
 */

var jsonwebtoken = require('jsonwebtoken');
var config = require('../../config');

module.exports = (() => {
	var sign = (payload, options) => {
		var _options = {
			expiresIn: 30
		};
		
		if (typeof options == "object") {
			_options = options;
		}
			
		var token = jsonwebtoken.sign(payload, config.jwt.secret, _options);
		
		return token;
	}
	
	return {
		sign: sign
	}
})();