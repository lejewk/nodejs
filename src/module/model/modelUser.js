/**
 * Created by lejewk on 2017-02-21.
 */

var users = require('../../users');

module.exports = (() => {
	var findByUsernameAndPassword = (username, password) => {
		return new Promise(resolve => {
			resolve(users.find(user => {
				return user.username === username && user.password === password
			}));
		});
	};
	
	var findById = (id) => {
		return new Promise(resolve => {
			resolve(users.find(user => {
				return user.id === id
			}));
		});
	};
	
	return {
		findByUsernameAndPassword: findByUsernameAndPassword,
		findById: findById
	}
})();