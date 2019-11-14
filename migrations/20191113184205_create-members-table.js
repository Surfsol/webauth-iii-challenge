
exports.up = function(knex) {
    return knex.schema.createTable('members', users => {
      users.increments();
  
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
      users.string('department')
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('members');
  };