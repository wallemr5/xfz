var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename")
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var  sass  = require('gulp-sass')
var bs = require("browser-sync").create();
var util = require("gulp-util")
var sourcemaps = require("gulp-sourcemaps")

var path = {
    'css': './src/css/**/',
    'js' : './src/js/',
    'image': './src/images/',
    'css_dist': './dist/css/',
    'js_dist': './dist/js/',
    'image_dist': './dist/images/',
    'html':'./templates/**/'
};
gulp.task('html',function () {
    gulp.src(path.html + '*.html')
        .pipe(bs.stream())
})

gulp.task("css",function () {
    gulp.src(path.css + "*.scss")
        .pipe(sass().on('error',sass.logError))
        .pipe(cssnano())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(bs.stream());
    });

gulp.task('js',function () {
    gulp.src(path.js+ '*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on("error",util.log))
        .pipe(rename({"suffix":".min"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream());
});

gulp.task('images',function () {
    gulp.src(path.image + '*.*')
        .pipe(cache(imagemin()))
        .pipe(bs.stream())
});

gulp.task('watch',function () {
    gulp.watch(path.css + '*.scss',['css']);
    gulp.watch(path.js + '*.js' , ['js']);
    gulp.watch(path.image + '*.*' ,['images']);
    gulp.watch(path.html + '*.html',['html']);
});

gulp.task('bs',function () {
    bs.init(
        {
            'server':{
                'baseDir':'./'
            }
        }
    )
});

gulp.task('default',['bs','watch'])