/// <binding AfterBuild='default' Clean='clean' />
var gulp = require('gulp');
var rimraf = require('rimraf');

var Builder = require("systemjs-builder");

// SystemJS build options.
var builderOptions = {
    normalize: true,
    runtime: false,
    sourceMaps: false,
    sourceMapContents: false,
    minify: true,
    mangle: false
};
var builder = new Builder('./');
builder.config({
    paths: {
        "n:*": "node_modules/*",
        "rxjs/*": "node_modules/rxjs/*.js",
    },
    map: {
        "rxjs": "n:rxjs",
    },
    packages: {
        "rxjs": { main: "Rx.js", defaultExtension: "js" },
    }
});

gulp.task("build-RxJS-System", function () {
    builder.bundle('rxjs', 'node_modules/.tmp/Rx.umd.min.js', builderOptions).then(function (output) {
        gulp.src("node_modules/.tmp/Rx.umd.min.js").pipe(gulp.dest('wwwroot/lib/rxjs'));
    });
});

var paths = {
    npm: "./node_modules/",
    lib: "./wwwroot/lib/",
    componentTemplates: "./wwwroot/templates/",
    componentOverwriteTemplates: "./wwwroot/template_overwrites/",
    compiledTS: "./dist/",
    appjs: "./wwwroot/js/",
    bower: "./bower_components/",
    external_libs: "./external_scripts/",
    componentCss: "./wwwroot/css/"
};

var libs = [
    { basePath: paths.npm, relPath: "moment/moment.js" },
    { basePath: paths.npm, relPath: "@angular/common/bundles/common.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/compiler/bundles/compiler.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/core/bundles/core.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/http/bundles/http.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/platform-browser/bundles/platform-browser.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/core/src/util/decorators.js" },
    { basePath: paths.npm, relPath: "@angular/core/src/facade/lang.js" },
    { basePath: paths.npm, relPath: "@angular/router/bundles/router.umd.min.js" },
    { basePath: paths.npm, relPath: "@angular/forms/bundles/forms.umd.min.js" },
    { basePath: paths.npm, relPath: "basecode/bundles/basecode.min.js" },
    { basePath: paths.npm, relPath: "es6-shim/es6-shim.min.js" },
    { basePath: paths.npm, relPath: "zone.js/dist/zone.js" },
    { basePath: paths.npm, relPath: "reflect-metadata/reflect.js" },
    { basePath: paths.npm, relPath: "systemjs/dist/system.src.js" },
    { basePath: paths.npm, relPath: "systemjs/dist/system-polyfills.js" },
    // { basePath: paths.npm, relPath: "angular2-cookie/bundles/angular2-cookie.min.js" }, // no need for now
    { basePath: paths.npm, relPath: "ng2-file-upload/components/file-upload/*.js" },
    { basePath: paths.npm, relPath: "ng2-file-upload/ng2-file-upload.js" },
    { basePath: paths.npm, relPath: "cropit/dist/jquery.cropit.js" },

    { basePath: paths.npm + "jquery/dist/", relPath: "jquery.min.js" },
    { basePath: paths.external_libs, relPath: "jquery-ui.min.js" },
    { basePath: paths.npm + "bootstrap/dist/js/", relPath: "bootstrap.min.js" },
    { basePath: paths.external_libs, relPath: "jquery.datetimepicker.min.js" },
    // { basePath: paths.external_libs, relPath: "kendo.all.min.js" }, // no need for now
    // { basePath: paths.external_libs, relPath: "pqgrid.min.js" }, // no need for now
    // { basePath: paths.external_libs, relPath: "alasql.js" }, // no need for now
    { basePath: paths.external_libs, relPath: "FileSaver.min.js" },
    { basePath: paths.external_libs, relPath: "xlsx.core.min.js" }
];

var lastChangeID = 1;
var busyBuild = false;

var log = console.log.bind(console);

// to ensure that rxjs is builded once more and that last version will be used
gulp.task("libs", function () {
    libs.map(function (x) {
        var dest = x.relPath.substr(0, x.relPath.lastIndexOf('/'));
        dest = dest.indexOf('angular') !== -1 ? dest.substr(0, dest.lastIndexOf('/')) : dest;
        gulp.src(x.basePath + x.relPath).pipe(gulp.dest(paths.lib + dest));
    });
    gulp.src("./node_modules/primeng/components/**/*.js").pipe(gulp.dest(paths.lib + 'primeng/components/'));
    gulp.src("./node_modules/primeng/primeng.js").pipe(gulp.dest(paths.lib + 'primeng/'));

    gulp.src("./node_modules/primeui/themes/smoothness/**/*").pipe(gulp.dest('wwwroot/css/primeui/theme/'));
    gulp.src("./node_modules/primeui/primeui-ng-all.min.css").pipe(gulp.dest('wwwroot/css/primeui/'));

    gulp.src('./scripts/**/*.css').pipe(gulp.dest(paths.componentCss));
    gulp.src('./scripts/es5-shim.js').pipe(gulp.dest('wwwroot/lib/es6-shim/'));
    gulp.src("./scripts/systemjs.config.js").pipe(gulp.dest('wwwroot/js/'));
});

gulp.task("appCopy", function () {
    gulp.src("scripts/**/*").pipe(gulp.dest("wwwroot/Scripts/"));
    gulp.src("scripts/services/login.info.ts").pipe(gulp.dest("wwwroot/Scripts/services/"));
    gulp.src("css/**/*").pipe(gulp.dest(paths.componentCss));
    gulp.src("dist/admingui.js").pipe(gulp.dest(paths.appjs));
});

gulp.task('templates', function () {
    gulp.src('./scripts/**/*.html').pipe(gulp.dest(paths.componentTemplates));

});

gulp.task("clean", function (callback) {
    var dummyFun = function (x) { };

    rimraf(paths.appjs, dummyFun);
    rimraf(paths.compiledTS, dummyFun);
    rimraf(paths.lib, dummyFun);
    rimraf(paths.componentTemplates, callback);
});

gulp.task('default', ['build-RxJS-System', 'libs', 'templates', 'appCopy'], function () {
    // nothing
});

gulp.task('webserver', function () {
    connect.server({
        root: 'wwwroot',
        port: 8888
    });
});

gulp.task('htmlreload', function () {
    gulp.src('./wwwroot/**/*.html')
        .pipe(connect.reload());
});

gulp.task('jsreload', function () {
    gulp.src('./wwwroot/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch-wwwroot', function () {
    gulp.watch(['./wwwroot/**/*.html'], ['htmlreload']);
    gulp.watch(['./wwwroot/**/*.js'], ['jsreload']);
});
