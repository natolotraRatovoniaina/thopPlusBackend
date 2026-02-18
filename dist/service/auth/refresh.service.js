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
exports.authRefreshService = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../utils/jwt");
const tokenStore_1 = __importDefault(require("../../utils/tokenStore"));
const refresh_service_utils_1 = require("./utils/refresh.service.utils");
const authRefreshService = (res, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        return { status: 401, data: { error: 'Refresh token manquant' } };
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        const jti = decoded.jti;
        if (!jti || !tokenStore_1.default.has(jti)) {
            return { status: 401, data: { error: 'Refresh token revoque' } };
        }
        tokenStore_1.default.delete(jti);
        const newAccess = (0, jwt_1.signAccessToken)({
            id: decoded.id,
            username: decoded.username,
        });
        const newJti = (0, crypto_1.randomUUID)();
        tokenStore_1.default.add(newJti);
        const newRefresh = (0, jwt_1.signRefreshToken)({ id: decoded.id, username: decoded.username }, newJti);
        (0, refresh_service_utils_1.setRefreshCookie)(res, newRefresh);
        return {
            status: 200,
            data: { accessToken: newAccess, expiresIn: process.env.ACCESS_TOKEN_TTL },
        };
    }
    catch (_a) {
        return { status: 401, data: { error: 'Refresh token invalide ou expire' } };
    }
});
exports.authRefreshService = authRefreshService;
