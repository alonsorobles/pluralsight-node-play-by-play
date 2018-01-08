import express from 'express';
import bodyParser from 'body-parser';
import cats from './routes/cat';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/cats', {useMongoClient: true});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

cats(app);

app.listen(3000, () => {
  console.log('Cat server running at http://127.0.0.1:3000/');
});
