var gulp = require("gulp");
var webpack = require("gulp-webpack");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var gulpTypings = require("gulp-typings");
var git = require("gulp-git");
var fs = require("fs");
 
// Install typings.
gulp.task("typings",function(){
  return ! fs.existsSync("./typings") ?
    gulp.src("./typings.json")
      .pipe(gulpTypings()) : null;
});

// Build TypeScript.
gulp.task("webpack", function(callback) {
  var build = gulp.src("modules/*")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("build/"));

  return build;
});

gulp.task("moveout", function(callback) {
  var move = gulp.src(["build/client.d.ts", "build/client.js"])
    .pipe(gulp.dest(""));

  return move;
});

gulp.task("tsbuild", function(callback) {
  return runSequence("webpack", "moveout", callback);
});

gulp.task("git-add", function(){
  return gulp.src("build/*")
    .pipe(git.add());
});

gulp.task("build", function(callback) {
  runSequence("typings", "tsbuild", "git-add", callback);
});
