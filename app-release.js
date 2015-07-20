var fs = require('fs');
var path = require('path');
var express = require('express');
var path = require('path');
var notesHandler = require('./request-handlers/notes-handler');
var appConfig = require('./app-config.json');
var compression = require('compression');

var app = express();
app.set('env', 'production');

var publicDir = path.join(__dirname, 'public');
var maxAge = 86400 * 1000;

app.use(compression());
app.use('/', express.static(publicDir, { maxAge: maxAge }));

// app.use(favIcon());
// app.use(express.logger('dev'));

app.set('view engine', 'jsx');

app.engine('jsx', require('express-react-views').createEngine());

var staticHtmlDir = path.join(publicDir, 'html');

app.get('/', function(req, res) {
    res.sendFile(path.join(staticHtmlDir, 'index.html'), { maxAge: maxAge });
});

app.get('/projects', function(req, res) {
    res.sendFile(path.join(staticHtmlDir, 'project-list.html'), { maxAge: maxAge });
});

app.get('/resume',function (req, res) {
	res.sendFile(path.join(staticHtmlDir, 'resume.html'), { maxAge: maxAge });
});

notesHandler(app, appConfig.notes);

app.listen(3000);

console.log('Server started: http://localhost:3000/');
