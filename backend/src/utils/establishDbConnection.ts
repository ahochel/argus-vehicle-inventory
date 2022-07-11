import mongoose from 'mongoose';

/* eslint-disable no-console */
const establishDbConnection = async () => {
  const {
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_APP_USER,
    MONGODB_APP_PASS,
    MONGODB_APP_DBNAME,
  } = process.env;
  const connectionURI = `mongodb://${MONGODB_APP_USER}:${MONGODB_APP_PASS}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_APP_DBNAME}`;

  console.log(connectionURI);

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
