/// <binding AfterBuild='default' Clean='clean' />
var gulp = require('gulp');
var rimraf = require('rimraf');
//var concat = require('gulp-concat');
//var tap = require('gulp-tap');
//var sourcemaps = require("gulp-sourcemaps");
//var rename = require("gulp-rename");
var exec = require('child_process').exec;
//var connect = require('gulp-connect');
//var batch = require('gulp-batch');
var http = require('http');
//var fs = require('fs');
// var gcallback = require('gulp-callback')

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
        "rxjs": {main: "Rx.js", defaultExtension: "js"},
    }
});

gulp.task("build-RxJS-System", function() {
	builder.bundle('rxjs', 'node_modules/.tmp/Rx.umd.min.js', builderOptions).then(function(output) {
		gulp.src("node_modules/.tmp/Rx.umd.min.js").pipe(gulp.dest('wwwroot/lib/rxjs'));
	});
});

var compileTS = require('gulp-typescript');
var projects = [
        {name: 'currentApp', files: 'scripts', project: compileTS.createProject('tsconfig.json'), rootDir: ''}
];

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
	// { basePath: paths.npm, relPath: "basecode/bundles/basecode.umd.min.js" },
	
    { basePath: paths.npm, relPath: "es6-shim/es6-shim.min.js" },
    { basePath: paths.npm, relPath: "zone.js/dist/zone.js" },
	// { basePath: paths.npm, relPath: "rxjs/bundles/Rx.min.js" },
    { basePath: paths.npm, relPath: "reflect-metadata/reflect.js" },
    { basePath: paths.npm, relPath: "systemjs/dist/system.src.js" },
    { basePath: paths.npm, relPath: "systemjs/dist/system-polyfills.js" },
    // { basePath: paths.npm, relPath: "angular2-cookie/bundles/angular2-cookie.min.js" }, // no need for now
	{ basePath: paths.npm, relPath: "ng2-file-upload/components/file-upload/*.js" },
    { basePath: paths.npm, relPath: "ng2-file-upload/ng2-file-upload.js" },
    { basePath: paths.npm, relPath: "cropit/dist/jquery.cropit.js" },
	
    { basePath: paths.bower + "jquery/dist/", relPath: "jquery.min.js" },
    { basePath: paths.bower + "jquery-ui/", relPath: "jquery-ui.min.js" },
    { basePath: paths.bower + "bootstrap/dist/js/", relPath: "bootstrap.min.js" },

	{ basePath: paths.external_libs, relPath: "tag-autocomplete-jquery.control.js" },
    { basePath: paths.external_libs, relPath: "jquery.datetimepicker.min.js" },
    // { basePath: paths.external_libs, relPath: "kendo.all.min.js" }, // no need for now
    // { basePath: paths.external_libs, relPath: "pqgrid.min.js" }, // no need for now
    // { basePath: paths.external_libs, relPath: "alasql.js" }, // no need for now
	{ basePath: paths.external_libs, relPath: "FileSaver.min.js" },
    { basePath: paths.external_libs, relPath: "xlsx.core.min.js" }
];

var lastChangeID = 1;
var busyBuild = false;

function buildProject(tsProject, path, cb) {
    lastChangeID++;
    var currChange = lastChangeID;
    setTimeout(function() {
        if (currChange == lastChangeID && !busyBuild) {
            busyBuild = true;
            log('Build of ${tsProject.name} initiated from ${path}');
            exec('cd "' + tsProject.rootDir  + '" & ' + 'tsc', function (err, stdout, stderr) {
                if (cb) {
                    cb(tsProject.name);
                }
                log('Build of ${tsProject.name} completed');
                busyBuild = false;
            });
        }
    }, 1000);
}



gulp.task('compile-ts', function() {
    return projects.map(function (tsProject) { buildProject(tsProject, 'compile-ts') });
});

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
    //gulp.src("./node_modules/.tmp/Rx.umd.min.js").pipe(gulp.dest('wwwroot/lib/rxjs'));
	
});

gulp.task("appCopy", function () {
	//Comment by Duong 17/10
    //gulp.src("dist/*").pipe(gulp.dest(paths.appjs));
    //gulp.src("./scripts/systemjs.config.js").pipe(gulp.dest(paths.appjs));
    //ADD
    gulp.src("scripts/**/*").pipe(gulp.dest("wwwroot/Scripts/")); //add by Quan 22/6/2016
    gulp.src("scripts/services/login.info.ts").pipe(gulp.dest("wwwroot/Scripts/services/"));
});

gulp.task("appCopyWithCompile", ['compile-ts', 'appCopy'], function () {
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

gulp.task('default' ,['build-RxJS-System','libs', 'templates', 'appCopy'], function () {
	// nothing
});

gulp.task('webserver', function() {
  connect.server({
    root: 'wwwroot',
	port: 8888
  });
});
/*
gulp.task('webserver-live', function() {
    http.createServer(function (req, res) {
        var method = req.method;
        var body = [];
        var headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:8888',
                        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept'
                    };
                    
        if (method == "POST") {
            req.on('data', function(chunk) {
                body.push(chunk);
            }).on('end', function() {
                body = Buffer.concat(body).toString();
                res.writeHead(200, headers);
                res.end('Saved!');
                fs.writeFile('localStorage.dat', body);
                log(body);
            });
        } else if (method == "OPTIONS") {
            res.writeHead(200, headers);
            res.end('');
            log('CORS option request');
        } else {
            fs.readFile('localStorage.dat', function (err, data) {
                if (err) {
                    res.writeHead(400, headers);
                    res.end(err.message);
                    log(err.message);
                } else {
                    res.writeHead(200, headers);
                    res.end(data);
                    log('Local data storage requested and sent!');
                }
            });
        }
    }).listen(3456);
});
*/
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
