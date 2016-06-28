/**
 * Created by antoscenco_vladimir
 */

"use strict";

var gulp                = require('gulp'),
    imagemin            = require('gulp-imagemin'),
    pngquant            = require('imagemin-pngquant'),
    sourcemaps          = require('gulp-sourcemaps'),
    sass                = require('gulp-sass'),
    bourbon             = require('node-bourbon'),
    neat                = require('node-neat'),
    autoprefixer        = require('gulp-autoprefixer'),
    cleanCSS            = require('gulp-clean-css'),
    rename              = require('gulp-rename'),
    concat              = require('gulp-concat'),
    watch               = require('gulp-watch'),
    mainBowerFiles      = require('main-bower-files'),
    bowerNormalizer     = require('gulp-bower-normalize'),
    uglify              = require('gulp-uglify'),
    order               = require("gulp-order"),
    del                 = require('del'),
    postcss             = require('gulp-postcss'),
    assets              = require('postcss-assets'),
    browserSync         = require('browser-sync').create(),
    reload              = browserSync.reload,
    notify              = require('gulp-notify'),          //.on('error', notify.onError())
    debug               = require('gulp-debug');           //.pipe(debug({title: 'What\'s going on here ?! --->>>'}))


//- - - - - - - - - - - - - - - - - - - - - LIBS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Regex Example

//Exclude html5shiv|jquery
//var jsRegex       = (/^((?!html5shiv|jquery).)*\.js$/i);
//var jsFilter      = mainBowerFiles(jsRegex);

//Group of library in bower.json

var copy, concat_copy;

// (bower_no_concat, bower_libs) It's names of scripts-group in bower.json
copy                 = mainBowerFiles({group: 'bower_no_concat'});
concat_copy          = mainBowerFiles({group: 'bower_libs'});

//Just copy libs main files from bower_components to app/libs directory
gulp.task('copy:libs', function () {

    return gulp.src(copy, {base: 'bower_components'})
    .pipe(bowerNormalizer({bowerJson: 'bower.json'}))
    .pipe(gulp.dest('app/libs'))

});

//Take libs main files: order, concat, rename, uglify and put min output file in app/libs directory
gulp.task('concat:copy:libs', function () {

        var path = 'bower_components/'; // Path to your bower components

        return gulp.src(concat_copy, {base: 'bower_components'})
        .pipe(bowerNormalizer({bowerJson: 'bower.json'}))

        // Order libs
        .pipe(order([

            //How to order ?
            //If you put file here it will be first in order and jquery wll be the second
            "jquery/js/jquery.min.js"
            //Third file etc.

        ], {base: path}))

        .pipe(concat('libs.js'))
        .on('error', notify.onError())
        .pipe(debug({title: 'Concat done !'}))
        .pipe(rename({suffix: '.min'}))
        .on('error', notify.onError())
        .pipe(debug({title: 'Rename done !'}))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .on('error', notify.onError())
        .pipe(debug({title: 'Uglify done !'}))
        .pipe(gulp.dest('app/libs')) // path to dest dir

        .pipe(notify({
            title: 'It\'s looking good!',
            message: 'All libs has been successfully installed !'
        }) );

});

//All libs task
gulp.task('all:libs', ['copy:libs', 'concat:copy:libs'], function () {

   
});

//- - - - - - - - - - - - - - - - - - - - - - SERVER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('browser-sync', function () {

browserSync.init({
        //proxy: "http://localhost:8000",               //Your local site url
        server: "app"
        /**
         *
         * tunnel: "sailingproject"                     //Unique name of the project
         * online: true                                 //Start publish on web
         *
         * URL "http://sailingproject.localtunnel.me"   //Go to
         *
         * */
    });
});

//- - - - - - - - - - - - - - - - - - - - - - STYLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Sass to css with uglify, bourbon sass, bourbon neat, cleanCSS, autoprefixer
gulp.task('styles', function () {

    const processors = [
        assets({
            loadPaths: ['app/img/'],
            relativeTo: "app/css/"
            })
    ];

    //noinspection JSDuplicatedDeclaration
    return gulp.src('sass/**/*.sass')

        .pipe(sass({
            includePaths: require('node-bourbon').includePaths,
            includePaths: require('node-neat').includePaths
        }))
        .on('error', notify.onError())
        .pipe(rename({suffix: '', prefix: ''}))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/css'));
});

//- - - - - - - - - - - - - - - - - - - - - - JS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('dev-js', function () {

    return gulp.src('js/dev-main.js') //or (['./file3.js', './file1.js', './file2.js'])


        .pipe(concat('main.js'))
        //.on('error', notify.onError())
        //.pipe(debug({title: 'Concat done !'}))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .on('error', notify.onError())
        //.pipe(debug({title: 'Uglify done !'}))
        .pipe(rename({ basename: "main", suffix: '.min'}))
        .on('error', notify.onError())
        //.pipe(debug({title: 'Rename done !'}))
        .pipe(gulp.dest('app/js')); // path to dest dir

});


//- - - - - - - - - - - - - - - - - - - - - - IMAGES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Compress images
gulp.task('compressImages', function () {
    return gulp.src('not_compressed_img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/img/'));
});

//- - - - - - - - - - - - - - - - - - - - - - WATCH - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('images-watch', ['compressImages'], browserSync.reload);

gulp.task('main', function () {

    gulp.watch("app/css/**/*.css").on('change', browserSync.reload);
    gulp.watch("app/index.html").on('change', browserSync.reload);
    gulp.watch("app/js/main.min.js").on('change', browserSync.reload);
    gulp.watch("app/img/**/*", ['images-watch']).on('change', browserSync.reload);


    gulp.watch("sass/*.sass", ['styles']);
    gulp.watch("js/*.js", ['dev-js']);
    gulp.watch('not_compressed_img/**/*', ['images-watch']);
    gulp.start('browser-sync');

});


gulp.task('default', ['main']);



