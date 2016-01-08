var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var path = require('path'); 
var sass = require('gulp-sass');


gulp.task('sass', function () {
  return gulp.src('www/static/sass/*.style.sass')
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
        .pipe(gulp.dest('css'));

});

gulp.task('uglifyjs',function(){
        return gulp.src(path['js'])
        .pipe(plumber())
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest('dest'));

});

gulp.task('watch',function(){
    gulp.watch('./public/less/**/*.less', function(){
        gulp.run('less');
    });
        //gulp.watch(path['css'],['minifycss']);
        //gulp.watch(path['js'],['uglifyjs']);

});

gulp.task('default',['watch']);