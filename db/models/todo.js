const db = require('../');

const Todo = db.Model.extend({
  tableName: 'todo'
});

module.exports = db.model('Todo', Todo);