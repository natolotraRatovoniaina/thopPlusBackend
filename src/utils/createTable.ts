import { sequelize } from '../db/sequelize';

export async function createTable() {
  try {
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}
