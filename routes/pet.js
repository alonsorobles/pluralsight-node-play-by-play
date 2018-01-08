import request from 'request';
import async from 'async';
import redis from 'redis';

const r = request.defaults({json: true});
const client = redis.createClient(6379, '127.0.0.1');

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
        client.get('http://localhost:3001/dog', (error, dog) => {
          if (error) {
            callback({service: 'dog', error});
          }
          if (dog) {
            callback(null, JSON.parse(dog));
          } else {
            r({uri: 'http://localhost:3001/dog'}, (error, response, body) => {
              if (error) {
                callback({service: 'dog', error});
              }
              if (!error && response.statusCode === 200) {
                client.setex('http://localhost:3001/dog', 10, JSON.stringify(body.data), error => {
                  if (error) {
                    throw error;
                  }
                });
                callback(null, body.data);
              } else {
                callback(response.statusCode);
              }
            })
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
