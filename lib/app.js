const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler')();

app.use(morgan('dev'));
app.use(express.static('public'));

const studios = require('./routes/studios-routes');
const films = require('./routes/films-routes');
const actors = require('./routes/actors-routes');

app.use('/studios', studios);
app.use('/films', films);
app.use('/actors', actors);

app.use(errorHandler);

module.exports = app;
