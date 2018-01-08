import _ from 'lodash';

const cats = app => {

  const _cats = [];

  app.post('/cat', (req, res) => {
    _cats.push(req.body);
    res.json({info: 'cat created successfully'});
  });

  app.get('/cat', (req, res) => {
    res.send(_cats);
  });

  app.get('/cat/:id', (req, res) => {
    res.send(_.find(_cats, {name: req.params.id}));
  });

  app.put('/cat/:id', (req, res) => {
    const index = _.find(_cats, {name: req.params.id});
    _.merge(_cats[index], req.body);
    res.json({info: 'cat updated successfully'});
  });

  app.delete('/cat/:id', (req, res) => {
    const index = _.find(_cats, {name: req.params.id});
    _.pull(cats, index);
    res.json({info: 'cat deleted successfully'});
  });

};

export default cats;
