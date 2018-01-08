import r from 'request';
import async from 'async';

r.defaults({json: true});

const pets = app => {

  // Read
  app.get('/pets', (req, res) => {

    r({uri: 'http://localhost:3001/dog'}, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.json(body);
      } else {
        res.send(response.statusCode);
      }
    });

    r({uri: 'http://localhost:3000/cat'}, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.json(body);
      } else {
        res.send(response.statusCode);
      }
    });

  });

};

export default pets;
