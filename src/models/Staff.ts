import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

const Staff = sequelize.define(
  'Staff',
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_role: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'staff',
    timestamps: false,
  },
);

export default Staff;
