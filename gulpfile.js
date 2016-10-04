var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var path = require('path'); 
var less = require('gulp-less');
var gutil = require('gulp-util');
var sync = require('run-sequence');
var rename = require('gulp-rename');
var gutil = require( 'gulp-util');
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');

gulp.task('less', function () {
  return gulp.src('www/static/less/*.style.less')
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            gutil.beep();
            this.emit('end');
        }))
        
       .pipe(less())
    
    .pipe(minifycss())
    .pipe(gulp.dest('www/static/css'));
});

gulp.task('minifycss',function(){
        return gulp.src(path['css'])
        .pipe(plumber())
        .pipe(minifycss())
        .pipe(gulp.dest('css'));

});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', function(){
    return gulp.src("./www/static/app/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task("compile", function(){
    var tsResult = gulp.src("./www/static/app/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("www/static/build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", function() {
    return gulp.src(["./www/static/app/**/*.ts"])
        .pipe(gulp.dest("www/static/build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function(){
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("./www/static/js/lib"));
});

gulp.task('watch',function(){
    gulp.watch('www/static/less/**/*.less', function(){
        gulp.run('less');
    });
    gulp.watch(["./www/static/app/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["./www/static/app/**/*.html", "./www/static/app/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

gulp.task("build", ['compile', 'resources', 'libs'], function() {
    console.log("Building the project ...");
});

gulp.task('default',['watch']);