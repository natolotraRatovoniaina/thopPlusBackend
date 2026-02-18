"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const authenticateAccessToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!(auth === null || auth === void 0 ? void 0 : auth.startsWith('Bearer ')))
        return res.status(401).json({ error: 'Token manquant' });
    const token = auth.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        return next();
    }
    catch (_a) {
        return res.status(401).json({ error: 'Token invalide ou expire' });
    }
};
exports.authenticateAccessToken = authenticateAccessToken;
