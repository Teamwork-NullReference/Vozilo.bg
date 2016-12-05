var gulp = require('gulp');
var gutil = require('gulp-util');

let minify = require('gulp-minify');
let uglify = require('gulp-uglify');
let minifyCss = require('gulp-minify-css');
// let inject = require('gulp-inject');
var cdnizer = require('gulp-cdnizer');

gulp.task('default', function() {

    // place code for your default task here
});

gulp.task('build', function() {
    gulp.src('./public/styles/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/styles/'));

    gulp.src('./public/scripts/**/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: [],
            ignoreFiles: ['create-car-form.js']
        }))
        .on('error', gutil.log)
        .pipe(uglify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: [],
            ignoreFiles: ['create-car-form.js']
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./build/scripts/'));

    // const bootstrapCdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css';
    // const bootstrapJsCdn = 'maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js';
    // const bootstrapDatePickerCdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css';
    // const jquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
    // const jqueryValidation = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/additional-methods.js';
    // const jqueryUi = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/images/ui-icons_444444_256x240.png';
    // const fontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css';

    // gulp.src('./views/_layout.pug')
    //     .pipe(inject(gulp.src(bootstrapCdnUrl, { read: false }), { starttag: '<!-- inject:bootstrap -->' }))
    //     .pipe(inject(gulp.src(bootstrapJsCdn, { read: false }), { starttag: '<!-- inject:bootstrapJsCdn -->' }))
    //     .pipe(inject(gulp.src(bootstrapDatePickerCdnUrl, { read: false }), { starttag: '<!-- inject:bootstrapDatePicker -->' }))
    //     .pipe(inject(gulp.src(jquery, { read: false }), { starttag: '<!-- inject:jquery -->' }))
    //     .pipe(inject(gulp.src(jqueryUi, { read: false }), { starttag: '<!-- inject:jqueryUi -->' }))

    //     .pipe(gulp.dest('./views/build/'));

    // gulp.src('./views/authentication/sign-up')
    //     .pipe(inject(gulp.src(jqueryValidation, { read: false }), { starttag: '<!-- inject:jqueryValidation -->' }))
    //     .pipe(gulp.dest('./views/build/authentication/sign-up'));

    // gulp.src('./views/admin/list')
    //     .pipe(inject(gulp.src(fontAwesome, { read: false }), { starttag: '<!-- inject:fontAwesome -->' }))
    //     .pipe(inject(gulp.src(jqueryUi, { read: false }), { starttag: '<!-- inject:jqueryUi -->' }))
    //     .pipe(gulp.dest('./views/build/admin'));

    gulp.src('./views/_layout')
        .pipe(cdnizer({
            defaultCDNBase: '//my.cdn.host/base',
            allowRev: true,
            allowMin: true,
            files: [

                // This file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'js/app.js',

                // On Google's public CDN
                {
                    file: 'vendor/angular/angular.js',
                    package: 'angular',
                    test: 'window.angular',
                    cdn: '//ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
                },

                // On Firebase's public CDN
                {
                    file: 'vendor/firebase/firebase.js',
                    test: 'window.Firebase',
                    cdn: '//cdn.firebase.com/v0/firebase.js'
                }
            ]
        }))
        .pipe(gulp.dest('./views/build'));
});


// CDN's
// bootstrap: <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
// "bootstrap-datepicker" https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css