const express    = require ('express');
const mongoose   = require ('mongoose');
const bodyParser = require ('body-parser');
const morgan = require ('morgan')

let uri = process.env.MONGODB_URI || 'mongodb://localhost/my-blog';
mongoose.connect(uri,{useNewUrlParser: true} );

mongoose.Promise = Promise;

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send("Only /api/blogs or api/users work right now");
});

app.use('/api/users', require('./routes/users'));
app.use("/api/blogs", require("./routes/blogs"));

module.exports = app;
