/**
 * Created by lejewk on 2017-02-18.
 */

var ModuleSession = (() => {
	var getUserByRequest = req => {
		try {
			if (typeof req.session.passport.user == 'object') {
				return req.session.passport.user;
			}
		} catch(ex) {
			return null;
		}
		
		return null;
	};
	
	return {
		getUserByRequest: getUserByRequest
	};
})();

module.exports = ModuleSession;