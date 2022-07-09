import mongoose from 'mongoose';

class Database {
  constructor() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
    const connectionURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    mongoose
      .connect(connectionURI)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Database connection successful');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Database connection error', err);
      });
  }
}

export default new Database();
