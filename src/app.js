const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const loginAndGoToPage = require('./utils/login');
const getTheTent = require('./utils/reply');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('', async (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.post('/submit-form', async(req, res) => {
    const nid = req.body.userid;
    const npw = req.body.userpw;
    const targetPage = req.body.targetPage;
    const reply = req.body.reply;
    const headless = req.body.headless === 'true' ? true : false;
    const pageInfo = await loginAndGoToPage(nid, npw, targetPage, headless);
    await getTheTent(pageInfo, reply).then(() => {
        res.redirect('/');
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port '+port+'. http://localhost:'+port)
});