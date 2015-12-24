var gulp = require('gulp');
var typescript = require('gulp-typescript');
var babel = require('gulp-babel');


var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build', function() {
    gulp.src(['./src/**/*.ts'])
        .pipe(typescript(tsProject))
        .pipe(babel({
            plugins: [
                "transform-es2015-modules-commonjs"
                ],
            presets: [
                'es2015'
                ]
        }))
        .pipe(gulp.dest('build'))
});