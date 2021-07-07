// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3' //will be name o db
    },
    useNullAsDefault: true //prevents bugs and issues 
  },
    migrations: {
      directory: './data/migrations' //to put migrations under folder data
    },
    seeds: {
      directory: './data/seeds'
    },
    // add the following
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on Foreign Key enforcement
      },
    },

  

};
