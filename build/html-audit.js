'use strict'
const gulp = require('gulp');
const through2 = require('through2');
const readline = require('readline');
const fs = require('fs');

class HtmlAuditFile {
    constructor(fileName) {
        this.fileName = fileName;
        this.audit = [];

        this.linesToProcess = [];
        this.lineCount = 0;
    }

    analiseUl(lineToProcess) {
        if (!this.hasAttribute(lineToProcess, 'role')) {
            this.audit.push({
                lineNumber: lineToProcess.lineNumber,
                text: lineToProcess.text,
                error: 'unordered list must have a role attribute defined'
            });
        }
    }

    analiseOl(lineToProcess) {
        if (!this.hasAttribute(lineToProcess, 'role')) {
            this.audit.push({
                lineNumber: lineToProcess.lineNumber,
                text: lineToProcess.text,
                error: 'ordered list must have a role attribute defined'
            });
        }
    }

    analiseLi(lineToProcess) {
        if (!this.hasAttribute(lineToProcess, 'role')) {
            this.audit.push({
                lineNumber: lineToProcess.lineNumber,
                text: lineToProcess.text,
                error: 'list item must have a role attribute defined'
            });
        }
    }

    analiseImg(lineToProcess) {
        if (!this.hasAttribute(lineToProcess, 'alt')) {
            this.audit.push({
                lineNumber: lineToProcess.lineNumber,
                text: lineToProcess.text,
                error: 'image must have alt attribute defined'
            });
        }
    }

    hasAttribute(lineToProcess, attribute) {
        return lineToProcess.text.toLowerCase().indexOf(`${attribute}="`) > -1;
    }

    createAuditReport() {
        return new Promise(function (resolve) {
            for (var i = 0; i < this.linesToProcess.length; i++) {
                const lineToProcess = this.linesToProcess[i];
                const type = lineToProcess.type;

                if (type == 'ul') {
                    this.analiseUl(lineToProcess)
                }
                else if (type == 'ol') {
                    this.analiseOl(lineToProcess)
                }
                else if (type == 'li') {
                    this.analiseLi(lineToProcess)
                }
                else if (type == 'img') {
                    this.analiseImg(lineToProcess)
                }
            }

            resolve();
        }.bind(this));
    }

    process () {
        return new Promise(function(resolve) {
            const processLine = this.processLine.bind(this);

            const rl = readline.createInterface({
                input: fs.createReadStream(this.fileName)
            });

            rl.on('line', function(line) {
                processLine(line);
            }).on('close', function() {
                this.createAuditReport().then(function() {
                    resolve(this.audit);
                }.bind(this));
            }.bind(this));
        }.bind(this))
    };

    processLine(line) {
        this.lineCount ++;

        let lineToProcess = line.toLowerCase();

        if (lineToProcess.indexOf('<ul') > -1) {
            this.addLineToProcessQueue(line, 'ul');
        }
        else if (lineToProcess.indexOf('<ol') > -1) {
            this.addLineToProcessQueue(line, 'ol');
        }
        else if (lineToProcess.indexOf('<li') > -1) {
            this.addLineToProcessQueue(line, 'li');
        }
        else if (lineToProcess.indexOf('<img') > -1) {
            this.addLineToProcessQueue(line, 'img');
        }
    }

    addLineToProcessQueue(line, type) {
        this.linesToProcess.push({
            lineNumber: this.lineCount,
            text: line.trim(),
            type: type
        });
    }
}

class Audit {
    constructor(auditType) {
        this.auditType = auditType;
        this.auditResults = [];
    }

    parse(file, encoding, callback) {
        const fileName = String(file.path);
        const auditFile = new HtmlAuditFile(fileName);

        auditFile.process().then(function(result) {
            if (result && result.length > 0) {
                this.auditResults.push({
                    fileName: auditFile.fileName,
                    audit: result
                });
            }
            callback();
        }.bind(this));
    };

    printResults() {
        if (this.auditResults.length === 0) {
            console.log('Audit passed, well done!', 'color: #02F231');
            return;
        }

        console.log('Audit failed, please review audit files in "covarage/audits', 'color: #F20254');

        var dir = './coverage';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFile(dir +  `/${this.auditType}.json`, this.auditResults.jsonText(), done);
    }
}

gulp.task('audit:html', function() {
    var audit = new Audit('html-audit');

    return gulp.src('src/**/*.html', {read: false})
        .pipe(through2({objectMode: true}, audit.parse.bind(audit)))
        .on('finish', function() {
            audit.printResults();
        });
});