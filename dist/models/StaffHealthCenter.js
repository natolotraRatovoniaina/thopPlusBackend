"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const StaffHealthCenter = sequelize_2.sequelize.define('StaffHealthCenter', {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_health_center: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    id_staff: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    tableName: 'staff_health_center',
    timestamps: false,
});
exports.default = StaffHealthCenter;
