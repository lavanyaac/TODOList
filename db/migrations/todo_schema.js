exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('todo', function (table) {
      table.increments('id').unsigned().primary();
      table.string('todo', 200).notNullable();
      table.string('status', 30).notNullable();
      table.integer('list_order').unsigned().notNullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todo')
  ]);
};