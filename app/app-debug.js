const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favIcon = require('serve-favicon');
const methodOverride = require('method-override');
const notesHandler = require('./request-handlers/notes-handler');
const appConfig = require('./app-config.json');
const projectLoader = require('./request-handlers/project-loader')(appConfig.projectsLocation);

const environmentOpts = {
    maxAge: 0
};

const app = express();
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
// app.use(favIcon());
// app.use(express.logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.set('views', __dirname + '/views');
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());

// development only
if ('development' === app.get('env'))
    app.use(require('errorhandler')());

app.get('/', async (req, res) => {
  try {
    const bioMarkdown = await fs.readFile(appConfig.bio.path);
    res.render('index/index', { bio: bioMarkdown });
  } catch (exception) {
    console.error(exception);
  }
});

app.get('/projects', async (req, res) => {
  try {
    const rawProjectData = await fs.readFile(path.join(appConfig.projectsLocation, 'projects.json'));

    portfolios = await projectLoader(rawProjectData);

    res.render('project/project-list', { projects: portfolios });
  } catch (exception) {
    console.error(exception);
  }
});

app.get('/resume', async (req, res) => {
  try {
    const resumeMarkdown = await fs.readFile(appConfig.resumeLocation);
    res.render('resume/resume', { resume: resumeMarkdown });
  } catch (exception) {
    console.log(exception);
  }
});

notesHandler(app, appConfig.notes, environmentOpts);

app.listen(3000);

console.log('Server started: http://localhost:3000/');
