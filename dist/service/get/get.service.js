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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthCentersService = exports.getLocationsService = exports.getRoleService = exports.getUsernameService = void 0;
const promises_1 = require("fs/promises");
const HealthCenter_1 = __importDefault(require("../../models/HealthCenter"));
const Role_1 = __importDefault(require("../../models/Role"));
const User_1 = __importDefault(require("../../models/User"));
const getUsernameService = (name, firstname) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || !firstname)
        return { status: 400, error: 'Il y a des informations manquant' };
    let exists = true;
    let username;
    while (exists) {
        const base = (firstname[0] + name).toLowerCase().replace(/[^a-z0-9]/g, '');
        const randomNum = Math.floor(100 + Math.random() * 900);
        username = `${base}${randomNum}`;
        const user = yield User_1.default.findOne({ where: { username } });
        if (!user)
            exists = false;
    }
    return { status: 200, data: { message: 'Username généré avec succès', username } };
});
exports.getUsernameService = getUsernameService;
const getRoleService = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield Role_1.default.findAll();
    const id = roles.map((r) => r.id);
    const name = roles.map((r) => r.name);
    return { status: 200, data: { roles: { id, name } } };
});
exports.getRoleService = getRoleService;
const getLocationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const dir = {
        pathRegion: 'data-location/liste_region.json',
        pathDistrict: 'data-location/liste_district_par_region.json',
        pathCommune: 'data-location/liste_commune_par_district.json',
    };
    const dataRegion = yield (0, promises_1.readFile)(dir.pathRegion, 'utf8');
    const dataDistrict = yield (0, promises_1.readFile)(dir.pathDistrict, 'utf8');
    const dataCommune = yield (0, promises_1.readFile)(dir.pathCommune, 'utf8');
    return {
        status: 200,
        data: JSON.stringify({ region: dataRegion, district: dataDistrict, commune: dataCommune }),
    };
});
exports.getLocationsService = getLocationsService;
const getHealthCentersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const healthCenters = yield HealthCenter_1.default.findAll({ attributes: ['id', 'name'] });
        const id = healthCenters.map((h) => h.id);
        const name = healthCenters.map((h) => h.name);
        return { status: 200, data: { healthCenters: { id, name } } };
    }
    catch (error) {
        return { status: 400, error: error };
    }
});
exports.getHealthCentersService = getHealthCentersService;
