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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const sequelize_1 = require("./db/sequelize");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const get_routes_1 = __importDefault(require("./routes/get.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const createTable_1 = require("./utils/createTable");
dotenv_1.default.config();
class MyServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.useMiddlewares();
        this.useRoutes();
    }
    useMiddlewares() {
        this.app.use((0, cors_1.default)({ credentials: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    useRoutes() {
        this.app.use('/api/auth', auth_routes_1.default);
        this.app.use('/api/images', express_1.default.static('images', { index: false }));
        this.app.use('/api', upload_routes_1.default);
        this.app.use('/api', get_routes_1.default);
    }
    start(ip, port) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, sequelize_1.connectDb)();
                yield (0, createTable_1.createTable)();
                this.server.listen(port, ip, () => {
                    console.log(`Server is running in http://${ip}:${port}`);
                });
            }
            catch (error) {
                console.error('Failed to start server:', error);
            }
        });
    }
}
exports.default = MyServer;
