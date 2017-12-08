const knex = require('knex')(require('../../knexfile'));

module.exports.getAll = (req, res) => {
  knex.select('id', 'todo', 'status', 'list_order')
  .from('todo')
  .orderBy('status', 'asc')
  .orderBy('list_order','desc')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    });
}

module.exports.updateItem = (req, res) => {
	let data = req.body;
	delete data['id'];

  knex('todo')
  	.where('id', parseInt(req.params.id))
  	.update(data)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    });
}

module.exports.addItem = (req, res) => {
	let data = req.body;

  knex('todo')
  	.insert(data)
  	.returning('id')
    .then((results) => {
    	console.log("post results", results)
      res.status(200).send(results);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    });
}

module.exports.deleteItem = (req, res) => {
  knex('todo')
  	.where('id', parseInt(req.params.id))
  	.del()
    .then((results) => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    });
}

module.exports.deleteCompletedItems = (req, res) => {
  knex('todo')
  	.where('status', 'completed')
  	.returning('id')
  	.del()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    });
}
module.exports.patchItems = (req, res) => {
  let list = req.body;
  Promise.all(list.map(row => {
    return knex('todo')
          .where('id', row.id)
          .update({'list_order': row.list_order})
          .then(table => {
              row.table = table;
              return row;
            });
  })).then(results => {
      res.sendStatus(200);
  })
  .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    });
}