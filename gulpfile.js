var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var browserSync = require("browser-sync").create();

// Compile sass code
gulp.task("sass", function() {
	gulp.src("src/scss/*.scss")
		.pipe(sass({
			outputStyle: "expanded"
		}).on("error", sass.logError))
		.pipe(gulp.dest("public/css"));
});

gulp.task("pug", function() {
	gulp.src("src/pug/*.pug")
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest("public/"));
});

gulp.task('watch',function() {
		gulp.start(["pug"], ["sass"]);
		browserSync.init({
			open: "external",
			port: 8080,
			server: "public/",
			logFileChanges: true
		});
    gulp.watch("src/pug/**/*", ["pug"]);
    gulp.watch("src/scss/**/*", ["sass"]);
    gulp.watch("src/**/*").on("change", function() {
			// Delay browser reload by 1 second
			setTimeout(function () {
				browserSync.reload()
			}, 1000)
		});
});

gulp.task("default", ["watch"]);