var gulp = require( 'gulp' );
var chug = require( 'gulp-chug' );
var install = require( 'gulp-install' );
var gulpIgnore = require('gulp-ignore');
var print = require('gulp-print');

gulp.task( 'install', function () {
    gulp.src('./**/package.json')
        .pipe(install())
})
 
gulp.task( 'build', ['install'], function () {
 
    // Find and run all gulpfiles under all subdirectories 
    gulp.src( './*/**/gulpfile.js' )
        .pipe(gulpIgnore.exclude(/node_modules/))
        .pipe(print())
        .pipe(chug({
            tasks:['build']
        }));
} );