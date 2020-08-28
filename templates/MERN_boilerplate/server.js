const express = require('express'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	config = require('config');

const app = express();

const db = config.get('mongoURI');

app.use(express.json());
app.use(cors());

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('Mongodb is conencted'))
	.catch(err => console.log(err));

// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
app.get('/', (req, res) => {
	res.end('This comes from the server');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));