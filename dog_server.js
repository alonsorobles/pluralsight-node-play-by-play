import express from 'express';
import bodyParser from 'body-parser';
import dogs from './routes/dog';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/dogs', {useMongoClient: true});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

dogs(app);

app.listen(3001, () => {
  console.log('Dog server running at http://127.0.0.1:3001/');
});
