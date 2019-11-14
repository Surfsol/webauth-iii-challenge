const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('members').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('members').where(filter);
}

async function add(user) {
    console.log(`add`, user)
  const [id] = await db('members').insert(user);

  return findById(id);
}



function findById(id) {
  return db('members')
    .where({ id })
    .first();
}
