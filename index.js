import express from 'express';
import bodyParser from 'body-parser';
import cats from './cats';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

cats(app);

app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
