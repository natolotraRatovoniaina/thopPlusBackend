"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const HealthCenter = sequelize_2.sequelize.define('HealthCenter', {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_type: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'health_center',
    timestamps: false,
});
exports.default = HealthCenter;
