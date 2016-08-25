require('dotenv').config({silent:true});

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/willcall'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
