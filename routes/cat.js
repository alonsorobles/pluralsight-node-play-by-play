import _ from 'lodash';
import Cat from '../models/cat';

const cats = app => {

  // Create
  app.post('/cat', (req, res) => {
    const newCat = new Cat(req.body);
    newCat.save(err => {
      if (err) {
        res.json({info: 'error creating cat', error: err})
      }
      res.json({info: 'cat created successfully', data: newCat});
    });
  });


  // Read
  app.get('/cat', (req, res) => {
    Cat.find((err, cats) => {
      if (err) {
        res.json({info: 'error finding cats', error: err});
      }
      res.json({info: 'cats found successfully', data: cats});
    });
  });

  app.get('/cat/:id', (req, res) => {
    Cat.findById(req.params.id, (err, cat) => {
      if (err) {
        res.json({info: 'error finding cat', error: err});
      }
      if (cat) {
        res.json({info: 'cat found', data: cat});
      } else {
        res.json({info: 'cat not found'});
      }
    });
  });

  // Update
  app.put('/cat/:id', (req, res) => {
    Cat.findById(req.params.id, (err, cat) => {
      if (err) {
        res.json({info: 'error finding cat', error: err});
      }
      if (cat) {
        _.merge(cat, req.body);
        cat.save(err => {
          if (err) {
            res.json({info: 'error updating cat', error: err})
          }
          res.json({info: 'cat updated successfully', data: cat});
        });
      } else {
        res.json({info: 'cat not found'});
      }
    });
  });

  // Delete
  app.delete('/cat/:id', (req, res) => {
    Cat.findByIdAndRemove(req.params.id, err => {
      if (err) {
        res.json({info: 'error removing cat', error: err});
      }
      res.json({info: 'cat removed successully'});
    });
  });

};

export default cats;
