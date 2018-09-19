(function (global) {

    // map tells the System loader where to look for things
    var map = {
        //'rxjs': 'lib/rxjs',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        //'angular2-cookie': 'lib/angular2-cookie',
        '@angular': 'lib/@angular',
        'moment': 'lib/moment/moment.js',
        'ng2-file-upload': 'lib/ng2-file-upload',
        'ng2-translate': 'lib/ng2-translate',
        'primeng': 'lib/primeng',
		'basecode/core': 'lib/basecode/bundles/basecode.min.js',
		'basecode/controls': 'lib/basecode/bundles/basecode.min.js',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        //'rxjs': { defaultExtension: 'js' },
        // 'angular2-cookie': { main: "core.js", defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' },
        'moment': { defaultExtension: 'js' },
        'ng2-file-upload': { defaultExtension: 'js' },
        'ng2-translate': { defaultExtension: 'js' },
        'primeng': { defaultExtension: 'js' }
    };

    var packageNames = [
      '@angular/common',
      '@angular/compiler',
      '@angular/forms',
      '@angular/core',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angular/router-deprecated',
      '@angular/testing',
      '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: pkgName.substring(pkgName.indexOf('/') + 1, pkgName.length) + '.umd.min.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);
