/**
 * Created by lejewk on 2017-02-18.
 */
var gulp = require('gulp');
var gls = require('gulp-live-server');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var gulpsync = require('gulp-sync')(gulp);


/**
 * 빌드 제거
 */
gulp.task('clean', () => {
	return gulp.src('build/*', {
		read: false
	}).pipe(clean());
});

/**
 * 코드 트랜스
 */
gulp.task('babel', () => {
	return gulp.src([
		'src/**/*.js',
	]).pipe(babel({
		presets: ['es2015'],
		plugins: [
			'transform-regenerator'
		]
	})).pipe(gulp.dest('build'));
});

/**
 * www 데이터 카피
 */
gulp.task('copy_www', () => {
	return gulp.src([
		'src/bin/www'
	]).pipe(gulp.dest('build/bin'));
});

/**
 * 뷰 데이터 카피
 */
gulp.task('copy_views', () => {
	return gulp.src([
		'src/views/**'
	]).pipe(gulp.dest('build/views'));
});

/**
 * 퍼블릭 데이터 카피
 */
gulp.task('copy_public', () => {
	return gulp.src([
		'src/public/**'
	]).pipe(gulp.dest('build/public'));
});

/**
 * 서버 실행
 */
gulp.task('serve', () => {
	var server = gls.new('build/bin/www');
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

gulp.task('default', gulpsync.sync(['clean', 'copy_www', 'copy_views', 'copy_public', 'babel', 'serve']));