import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

const StaffHealthCenter = sequelize.define(
  'StaffHealthCenter',
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_health_center: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    id_staff: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: 'staff_health_center',
    timestamps: false,
  },
);

export default StaffHealthCenter;
