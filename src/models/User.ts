import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.literal("generate_custom_id('USER', 'user_id')"),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  },
);

export default User;
