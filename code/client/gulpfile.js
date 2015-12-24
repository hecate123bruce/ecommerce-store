var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('build', function() {
    gulp.src('./src/app/entry.tsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist'));
});