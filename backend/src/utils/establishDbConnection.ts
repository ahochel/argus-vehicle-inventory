import mongoose from 'mongoose';

/* eslint-disable no-console */
const establishDbConnection = async () => {
  const connectionURI = process.env.MONGODB_URI;

  if (!connectionURI) {
    throw new Error('MONGODB_URI env is missing');
  }

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
