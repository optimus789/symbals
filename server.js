const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const path = require('path');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 5000;
const host = process.env.APP_HOST || '0.0.0.0';

const moralisServerUrl = process.env.MORALIS_SERVER_URL;
const moralisAppKey = process.env.MORALIS_APP_KEY;
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

const server = app.listen(port, host, () => {
  console.log(`server is listening on Port  ${port} and on host ${host}`);
});

const profileRoute = require('./routes/profileRoute');
var apiRoute = require('./routes/apiRoute');

app.use('/api', apiRoute);

app.use('/profile', profileRoute);

app.get('/', (req, res) => {
  res.render('symbalsHome', { moralisAppKey, moralisServerUrl });
});

app.get('/symbals', (req, res) => {
  res.render('symbalsHome', { moralisAppKey, moralisServerUrl });
});

app.use(cors());
app.use(express.json());
