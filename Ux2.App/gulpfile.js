/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var clean = require("gulp-clean");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var ts = require("gulp-typescript");
var htmlmin = require('gulp-htmlmin');

gulp.task("shared:clean", function () {
    return gulp.src(["Dist/_Compiled/*", "Dist/Rel/*", "Dist/Dev/*"], { read: false })
    .pipe(clean());
});

gulp.task("dev:copy-html", ["shared:clean"], function () {
    return gulp.src("Source/**/*.html")
        .pipe(gulp.dest("Dist/Dev/www"));
});

gulp.task("prod:copy-html", ["shared:clean"], function () {
    return gulp.src("Source/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("Dist/Rel/www"));
});

gulp.task("shared:compile", ["shared:clean"], function () {
    return gulp.src([
            "Source/App/app.ts",
            "Source/App/Constants.ts",
            "Source/App/Config/**/*.ts",
            "Source/App/Services/**/*.ts",
            "Source/App/Components/**/*.ts",
            "Source/App/**/*.ts"
    ])
        .pipe(ts({ out: "app.js", emitDecoratorMetadata: true, preserveConstEnums: true }))
        .pipe(gulp.dest("Dist/_Compiled"));
});

gulp.task("prod:compress-app", ["shared:compile"], function () {
    return gulp.src("Dist/_Compiled/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("Dist/_Compiled/"));
});

gulp.task("dev:copy-js", ["prod:compress-app"], function () {
    return gulp.src(["Dist/_Compiled/app.js", "Dist/_Lib/lib.js"])
        .pipe(gulp.dest("Dist/Dev/www/scripts"));
});

gulp.task("prod:copy-js", ["dev:copy-js"], function () {
    return gulp.src(["Dist/_Compiled/app.min.js", "Dist/_Lib/lib.min.js"])
        .pipe(gulp.dest("Dist/Rel/www/scripts"));
});

gulp.task("default", [
    "shared:clean",
    "dev:copy-html",
    "prod:copy-html",
    "shared:compile",
    "prod:compress-app",
    "dev:copy-js",
    "prod:copy-js"
]);

/// LIB
gulp.task("shared:clean-lib", function () {
    return gulp.src("Dist/_Lib/*", { read: false })
    .pipe(clean());
});

gulp.task("shared:concat-lib", ["shared:clean-lib"], function () {
    return gulp.src([
            "node_modules/angular/angular.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js"
    ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("Dist/_Lib"));
});

gulp.task("prod:compress-lib", ["shared:concat-lib"], function () {
    return gulp.src("Dist/_Lib/lib.js")
        .pipe(uglify())
        .pipe(rename("lib.min.js"))
        .pipe(gulp.dest("Dist/_Lib"));
});

gulp.task("lib", ["shared:clean-lib", "shared:concat-lib", "prod:compress-lib"]);
