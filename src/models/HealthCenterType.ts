import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

const HealthCenterType = sequelize.define(
  'HealthCenterType',
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
    tableName: 'health_center_type',
    timestamps: false,
  },
);

export default HealthCenterType;
