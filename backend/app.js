const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const error = require('./middlewares/error');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://av-rakhmanova.nomoredomains.xyz', 'https://av-rakhmanova.nomoredomains.xyz'] }));

const { PORT = 4000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
}).then(() => {
  console.log('connected to db');
});

app.use(express.json());
app.use('/api', router);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
