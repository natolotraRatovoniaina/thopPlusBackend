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
exports.healthCenterUserRegister = exports.staffUserRegister = exports.simpleUserRegister = exports.userTypeChecker = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const HealthCenter_1 = __importDefault(require("../../../models/HealthCenter"));
const HealthCenterType_1 = __importDefault(require("../../../models/HealthCenterType"));
const Person_1 = __importDefault(require("../../../models/Person"));
const Role_1 = __importDefault(require("../../../models/Role"));
const Staff_1 = __importDefault(require("../../../models/Staff"));
const StaffHealthCenter_1 = __importDefault(require("../../../models/StaffHealthCenter"));
const User_1 = __importDefault(require("../../../models/User"));
const jwt_1 = require("../../../utils/jwt");
const userTypeChecker = (role, staff) => {
    if (role.toLowerCase() === 'simple') {
        return 'Simple';
    }
    else {
        if (!staff) {
            return 'Staff';
        }
        return 'HealthCenter';
    }
};
exports.userTypeChecker = userTypeChecker;
const simpleUserRegister = (_a, url_1) => __awaiter(void 0, [_a, url_1], void 0, function* ({ username, email, phone, password, firstname, lastname, sexe = true, }, url) {
    try {
        const user = yield User_1.default.findOne({ where: { username: username } });
        if (user)
            return { status: 400, data: { error: 'Utilisateur deja existant' } };
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = { username, password: passwordHash, phone, email, url };
        const userCreated = yield User_1.default.create(newUser);
        const newPerson = { id_user: userCreated.id, first_name: firstname, last_name: lastname, sexe };
        yield Person_1.default.create(newPerson);
        const accessToken = (0, jwt_1.signAccessToken)({
            id: userCreated.id,
            username: username,
        });
        return {
            status: 200,
            data: { message: 'Utilisateur enregistrer', accessToken },
            userInfo: { id: userCreated.id, username },
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.simpleUserRegister = simpleUserRegister;
const staffUserRegister = (_a, url_1, _b) => __awaiter(void 0, [_a, url_1, _b], void 0, function* ({ username, email, phone, password, firstname, lastname, sexe, }, url, { healthCenter, assignation, }) {
    if (!healthCenter || !assignation)
        return { status: 400, data: { error: 'Il y a des informations manquant' } };
    try {
        const user = yield User_1.default.findOne({ where: { username: username } });
        if (user)
            return { status: 400, data: { error: 'Utilisateur deja existant' } };
        const rolechecker = yield Role_1.default.findOne({ where: { id: assignation.id } });
        if (!rolechecker)
            return { status: 400, data: { error: "Le role n'existe pas" } };
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = { username, password: passwordHash, phone, email, url };
        const userCreated = yield User_1.default.create(newUser);
        const newPerson = { id_user: userCreated.id, firstname, lastname, sexe };
        yield Person_1.default.create(newPerson);
        const staffCreated = yield Staff_1.default.create({ id_role: assignation.id, id_user: userCreated.id });
        yield StaffHealthCenter_1.default.create({
            id_health_center: healthCenter.id,
            id_staff: staffCreated.id,
        });
        const accessToken = (0, jwt_1.signAccessToken)({
            id: userCreated.id,
            username: username,
        });
        return {
            status: 200,
            data: { message: 'Utilisateur enregistrer', accessToken },
            userInfo: { id: userCreated.id, username },
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.staffUserRegister = staffUserRegister;
const healthCenterUserRegister = (_a, url_1, _b) => __awaiter(void 0, [_a, url_1, _b], void 0, function* ({ username, email, phone, password, }, url, { name, type, location }) {
    if (!name || !type || !location)
        return { status: 400, data: { error: 'Il y a des informations manquant' } };
    try {
        const user = yield User_1.default.findOne({ where: { username: username } });
        if (user)
            return { status: 400, data: { error: 'Utilisateur deja existant' } };
        const healthCenterTypechecker = yield HealthCenterType_1.default.findOne({ where: { id: type.id } });
        if (!healthCenterTypechecker)
            return { status: 400, data: { error: "Le type de centre n'existe pas" } };
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = { username, password: passwordHash, phone, email, url };
        const userCreated = yield User_1.default.create(newUser);
        yield HealthCenter_1.default.create({
            id_type: type.id,
            name,
            id_user: userCreated.id,
            location,
        });
        const accessToken = (0, jwt_1.signAccessToken)({
            id: userCreated.id,
            username: username,
        });
        return {
            status: 200,
            data: { message: 'Utilisateur enregistrer', accessToken },
            userInfo: { id: userCreated.id, username },
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.healthCenterUserRegister = healthCenterUserRegister;
