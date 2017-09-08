var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 10 versions', { cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('scripts', function() {
	return gulp.src([
		'src/js/libs/jquery-3.2.1.min.js',
		'src/js/libs/jquery.jcarousel.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {
    var buildCss = gulp.src('src/css/main.css')
    .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});
