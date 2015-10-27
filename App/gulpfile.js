var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var path = require('path'); 
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var path = {
    'css':['./www/css/**/*.css','!./www/css/**/*.min.css'],
    'js':['./www/js/**/*.js','!./www/js/lib/*.js']
};

gulp.task('less', function () {
  return gulp.src('./public/less/**/base.less')
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            gutil.beep();
            this.emit('end');
        }))
       .pipe(less())
    
   // .pipe(minifycss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('minifycss',function(){
        return gulp.src(path['css'])
        .pipe(plumber())
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
         }))
        .pipe(gulp.dest('./public/css'));

});

gulp.task('uglifyjs',function(){
        return gulp.src(path['js'])
        .pipe(plumber())
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest('./www/static'));

});

gulp.task('watch',function(){
    gulp.watch('./www/less/**/*.less', function(){
        gulp.run('less');
        gulp.run('minifycss');
    });
    //gulp.watch(path['js'],function(){
      //  gulp.run('uglifyjs');
    //});

});

gulp.task('default',['watch','uglifyjs','minifycss']);