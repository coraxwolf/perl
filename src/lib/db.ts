import mysql from 'serverless-mysql';

const db = mysql(
  {
    config: {
      host: process.env.MYSQL_HOST || 'localhost',
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
    }
  }
);

export default db;
