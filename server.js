

const express = require('express');
// const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));


//parse request of content-type -application/json
app.use(express.json());

//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successful connected to the database");
}).catch(err => {
    console.log('could not connect to the database. Exiting now...', err);
    process.exit();
});

//define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// .........

// Require Notes route
require('./app/routes/note.routes.js')(app);

// ....


//listen for requests
app.listen(3000, () => {
    console.log("Server is now listening on port 3000");
});