const path = require('path');
// const forecast = require('../../weather-app/utils/forecast.js');
const express = require('express');
const app = express();
const hbss = require('hbs');
const { query } = require('express');
const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

/**
 * Define paths for Express config
 */
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
/**
 * setup handlebars engine and views location
 */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbss.registerPartials(partialsPath);

/**
 * Setup static directory to serve
 */
app.use(express.static(publicDirectoryPath));

/**
 *  Dynamic pages with templating
 */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Usama"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name : "Usama"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helping material",
        name: "Muhammad Usama",
        helpText:"This is some helping text"
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/Address', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address in url"
        });
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
    // res.send({
    //     forecast: "It is snowing",
    //     location: req.query.address
    // });
});

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        error: "404:Page Not found!",
    });
});


/**
 * Static pages with templating~
 */
app.get('', (request,response) => {
    response.send('Hello Express!');
});
app.get('/help', (req, res) => {
    res.send([{
        name: 'Usama',
        agr:26
    }, {
        name: "Muhammad",
        age:24
    }]);
});
app.get('/about', (req,res) => {
    res.send('About Page')
});
app.get('/weather', (req,res) => {
    res.send('<h1>Weather Data</h1>');
});

app.get('*', (req, res) => {
    res.send('<h1>404 Error</h1>');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});


/**
 * run this command if Error: listen EADDRINUSE: address already in use :::3000
 */
//kill $(lsof -t -i:3000

