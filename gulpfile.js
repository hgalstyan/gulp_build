"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const del = require("del");
const imagemin = require("gulp-imagemin");
const webserver = require('gulp-webserver');

gulp.task("scripts", function(){
    return gulp.src(["js/global.js","js/circle/**.js"])
        .pipe(maps.init())
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(rename("all.min.js"))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task("styles", function(){
    return gulp.src("sass/**.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(concat("app.min.css"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("dist/styles"))
});



gulp.task("images", function(){
    return gulp.src(["images/**.jpg","images/**.png"])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});

gulp.task('copy', function () {
    return gulp.src(['index.html', 'icons/*'],
         { base: './' })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del('dist');
});

gulp.task("build", gulp.series("clean", "scripts", "styles","images", "copy"));

gulp.task("serve", function(){
    gulp.src('./dist')
        .pipe(webserver({         
            livereload: true,
            host: 'localhost',
            port: 5000,
            directoryListing: false,
            open: true
        }));
})


gulp.task("default",gulp.series("build", "serve"));