const express = require('express');
const jwt = require('jsonwebtoken');
const coockieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./Routes/routes');
require('./MODELS/db');

const Port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(coockieParser());
app.use(cors());

app.use('/', routes);

app.listen(Port, ()=>{
    console.info(`app running on port: ${Port}`);
});