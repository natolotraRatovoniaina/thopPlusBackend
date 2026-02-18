"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const Staff = sequelize_2.sequelize.define('Staff', {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_role: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'staff',
    timestamps: false,
});
exports.default = Staff;
