"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthCentersController = exports.getLocationsController = exports.getRoleController = exports.getUsernameController = void 0;
const get_service_1 = require("../../service/get/get.service");
const getUsernameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, firstname } = req.body;
    try {
        const result = yield (0, get_service_1.getUsernameService)(name, firstname);
        return res.status(result.status).json(result.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsernameController = getUsernameController;
const getRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, get_service_1.getRoleService)();
        return res.status(result.status).json(result.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRoleController = getRoleController;
const getLocationsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, get_service_1.getLocationsService)();
        return res.status(result.status).json(result.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLocationsController = getLocationsController;
const getHealthCentersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, get_service_1.getHealthCentersService)();
        return res.status(result.status).json(result.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getHealthCentersController = getHealthCentersController;
