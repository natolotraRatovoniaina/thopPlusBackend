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
exports.authLoginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const User_1 = __importDefault(require("../../models/User"));
const jwt_1 = require("../../utils/jwt");
const tokenStore_1 = __importDefault(require("../../utils/tokenStore"));
const refresh_service_utils_1 = require("./utils/refresh.service.utils");
const authLoginService = (res, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!username || !password)
        return { status: 400, data: { error: 'Informations manquantes' } };
    try {
        const user = yield User_1.default.findOne({ where: { username: username } });
        const passwordHash = user.password;
        if (!user)
            return { status: 400, data: { error: 'Utilisateur introuvable' } };
        const passwdOk = yield bcrypt_1.default.compare(password, passwordHash);
        if (!passwdOk)
            return { status: 400, data: { error: 'Mot de passe incorrect' } };
        const accessToken = (0, jwt_1.signAccessToken)({
            id: user.id,
            username: user.username,
        });
        const jti = (0, crypto_1.randomUUID)();
        tokenStore_1.default.add(jti);
        const refreshToken = (0, jwt_1.signRefreshToken)({ id: user.id, username: user.username }, jti);
        (0, refresh_service_utils_1.setRefreshCookie)(res, refreshToken);
        return {
            status: 200,
            data: {
                message: 'Utilisateur desormais connecte',
                accessToken,
                expiresIn: process.env.ACCESS_TOKEN_TTL,
            },
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.authLoginService = authLoginService;
