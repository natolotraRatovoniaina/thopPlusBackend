"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TTL,
    });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload, jti) => {
    return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { jti }), process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_TTL,
    });
};
exports.signRefreshToken = signRefreshToken;
