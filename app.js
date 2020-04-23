const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Database connected'));

mongoose.connection.on('error', (err) => {
	console.log('DB connection error: ${err.message}');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use({ validateResult });

//routes
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
