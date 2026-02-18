"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/auth/login.controller"));
const logout_controller_1 = __importDefault(require("../controllers/auth/logout.controller"));
const refresh_controller_1 = __importDefault(require("../controllers/auth/refresh.controller"));
const register_controller_1 = __importDefault(require("../controllers/auth/register.controller"));
const authRoute = (0, express_1.Router)();
authRoute.post('/register', register_controller_1.default);
authRoute.post('/login', login_controller_1.default);
authRoute.post('/refresh', refresh_controller_1.default);
authRoute.post('/logout', logout_controller_1.default);
exports.default = authRoute;
