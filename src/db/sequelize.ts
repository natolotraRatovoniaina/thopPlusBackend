import { Sequelize } from 'sequelize';

const dbConfig = {
  db_name: 'thop',
  db_user: 'mit',
  db_pwd: '123456',
  db_ip: 'localhost',
  db_port: 5432,
  timezone: '+03:00',
};

export const sequelize = new Sequelize(
  `postgres://${dbConfig.db_user}:${dbConfig.db_pwd}@${dbConfig.db_ip}:${dbConfig.db_port}/${dbConfig.db_name}`,
);

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false, force: false });
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
