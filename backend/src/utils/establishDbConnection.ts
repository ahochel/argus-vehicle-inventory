import mongoose from 'mongoose';

/* eslint-disable no-console */
const establishDbConnection = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
  const connectionURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  let connection;

  console.log('Connecting to the database...');

  try {
    connection = await mongoose.connect(connectionURI);
    console.log('Successfully connected to the database');
  } catch (err) {
    console.error('Database connection error', err);
  }

  return connection;
};
/* eslint-enable no-console */

export default establishDbConnection;
