import express from 'express';
import bodyParser from 'body-parser';
import pets from './routes/pet';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

pets(app);

app.listen(3002, () => {
  console.log('Pet server running at http://127.0.0.1:3002/');
});
