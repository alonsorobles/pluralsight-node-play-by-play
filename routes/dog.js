import _ from 'lodash';
import Dog from '../models/dog';

const dogs = app => {

  // Create
  app.post('/dog', (req, res) => {
    const newDog = new Dog(req.body);
    newDog.save(err => {
      if (err) {
        res.json({info: 'error creating dog', error: err})
      }
      res.json({info: 'dog created successfully', data: newDog});
    });
  });


  // Read
  app.get('/dog', (req, res) => {
    Dog.find((err, dogs) => {
      if (err) {
        res.json({info: 'error finding dogs', error: err});
      }
      res.json({info: 'dogs found successfully', data: dogs});
    });
  });

  app.get('/dog/:id', (req, res) => {
    Dog.findById(req.params.id, (err, dog) => {
      if (err) {
        res.json({info: 'error finding dog', error: err});
      }
      if (dog) {
        res.json({info: 'dog found', data: dog});
      } else {
        res.json({info: 'dog not found'});
      }
    });
  });

  // Update
  app.put('/dog/:id', (req, res) => {
    Dog.findById(req.params.id, (err, dog) => {
      if (err) {
        res.json({info: 'error finding dog', error: err});
      }
      if (dog) {
        _.merge(dog, req.body);
        dog.save(err => {
          if (err) {
            res.json({info: 'error updating dog', error: err})
          }
          res.json({info: 'dog updated successfully', data: dog});
        });
      } else {
        res.json({info: 'dog not found'});
      }
    });
  });

  // Delete
  app.delete('/dog/:id', (req, res) => {
    Dog.findByIdAndRemove(req.params.id, err => {
      if (err) {
        res.json({info: 'error removing dog', error: err});
      }
      res.json({info: 'dog removed successully'});
    });
  });

};

export default dogs;
