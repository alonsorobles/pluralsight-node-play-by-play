import request from 'request';
import async from 'async';

const r = request.defaults({json: true});

const pets = app => {

  // Read
  app.get('/pets', (req, res) => {

    async.parallel({
      cat: callback => {
        r({uri: 'http://localhost:3000/cat'}, (error, response, body) => {
          if (error) {
            callback({service: 'cat', error});
          }
          if (!error && response.statusCode === 200) {
            callback(null, body.data);
          } else {
            callback(response.statusCode);
          }
        })
      },
      dog: callback => {
        r({uri: 'http://localhost:3001/dog'}, (error, response, body) => {
          if (error) {
            callback({service: 'dog', error});
          }
          if (!error && response.statusCode === 200) {
            callback(null, body.data);
          } else {
            callback(response.statusCode);
          }
        })
      },
    }, (error, results) => {
      res.json({error, results});
    });

  });

  app.get('/ping', (req, res) => {

    res.json({pong: Date.now()});

  });

};

export default pets;
