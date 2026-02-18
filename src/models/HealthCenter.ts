import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

const HealthCenter = sequelize.define(
  'HealthCenter',
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_type: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'health_center',
    timestamps: false,
  },
);

export default HealthCenter;
