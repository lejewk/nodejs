/**
 * Created by lejewk on 2017-02-18.
 */
var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function() {
	var server = gls.new('bin/www');
	server.start();
	
	// 서버 사이드 코드. 왜 감시해야하는지 모르겠음.
	// if (process.env.NODE === 'development') {
	// 	// 파일 감시. 아래 파일이 변경되면 ?? 어떻게 되나..
	// 	gulp.watch(['views/**/*.ejs', 'public/stylesheets/**/*.css'], function(file) {
	// 		console.log("resource file changed!!");
	// 		server.notify.apply(server, [file]);
	// 	});
	//
	// 	gulp.watch('app.js', function() {
	// 		console.log("js file changed!!");
	// 		try {
	// 			server.start.bind(server)();
	// 		} catch(ex) {
	// 			console.log(ex);
	// 		}
	// 	});
	// }
});

gulp.task('default', ['serve']);