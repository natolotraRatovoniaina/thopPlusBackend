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
exports.authLogoutService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenStore_1 = __importDefault(require("../../utils/tokenStore"));
const refresh_service_utils_1 = require("./utils/refresh.service.utils");
const authLogoutService = (res, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        if (decoded.jti) {
            tokenStore_1.default.delete(decoded.jti);
            (0, refresh_service_utils_1.clearRefreshCookie)(res);
            return { status: 200, data: { message: 'Deconnecte' } };
        }
    }
    return { status: 400, data: { error: 'Utilisateur deja deconnecte' } };
});
exports.authLogoutService = authLogoutService;
