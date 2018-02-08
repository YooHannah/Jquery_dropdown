var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

gulp.task('default', function() {
  gulp.src('dist/dropdown.js').pipe(babel({presets: ['es2015']})).pipe(jshint()).pipe(uglify()).pipe(rename('dropdown.min.js')).pipe(gulp.dest('src'));
  gulp.src('dist/dropdown.css').pipe(minifyCss()).pipe(rename('dropdown.min.css')).pipe(gulp.dest('src'));
});

