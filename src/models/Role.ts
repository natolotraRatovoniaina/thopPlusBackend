import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'role',
    timestamps: false,
  },
);

export default Role;
