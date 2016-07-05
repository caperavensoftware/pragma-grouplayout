const gulp = require('gulp');
const through2 = require('through2');
const readline = require('readline');
const fs = require('fs');

function HtmlAuditFile(fileName) {
console.log(fileName);
    this.fileName = fileName;
    this.audit = null;
}

HtmlAuditFile.prototype.createAuditReport = function() {
    // create result object of errors for this.audit.
    return new Promise(function(resolve) {
        console.log('generating audit results');
        resolve();
    })
};

HtmlAuditFile.prototype.process = function() {
    return new Promise(function(resolve) {
        const rl = readline.createInterface({
            input: fs.createReadStream(this.fileName)
        });

        rl.on('line', function(line) {
            console.log(line);
        }).on('close', function() {
            console.log('done processing file');

            this.createAuditReport().then(function() {
                resolve(this.audit);
            }.bind(this));
        }.bind(this));
    }.bind(this))
};

function HtmlAudit() {
}

HtmlAudit.prototype.parse = function(file, encoding, callback) {
    const fileName = String(file.path);
    const auditFile = new HtmlAuditFile(fileName);

    auditFile.process().then(function(result) {
        if (result) {
            AUDIT_RESULTS.push(result);
        }
        callback();
    });
};

HtmlAudit.prototype.printResults = function() {
    for(var i = 0; i < AUDIT_RESULTS.length; i++) {
        console.log('ERROR');
    }
}

var AUDIT_RESULTS = [];

gulp.task('audit:html', function() {
    AUDIT_RESULTS = [];
    var audit = new HtmlAudit();

    return gulp.src('src/**/*.html', {read: false})
        .pipe(through2({objectMode: true}, audit.parse))
        .on('finish', function() {
            if (AUDIT_RESULTS.length > 0) {
                audit.printResults();
            }
            else {
                console.log('No HTML Audit Issues, well done!');
            }
        });
});