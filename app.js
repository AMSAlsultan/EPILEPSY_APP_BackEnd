const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handling');
require('dotenv/config');


//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/Users/desig/EPILEPSY_APP/backend/tmp/my-uploads', express.static(__dirname + '/Users/desig/EPILEPSY_APP/backend/tmp/my-uploads'));
app.use(errorHandler)

//Routes
const categoriesRoutes = require('./routes/categories');
const filmsRoutes = require('./routes/films');
const usersRoutes = require('./routes/users');
const patientsRoutes = require('./routes/patients');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/films`, filmsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/patients`, patientsRoutes);


//Datebase
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'epilepsy_warning_app'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})