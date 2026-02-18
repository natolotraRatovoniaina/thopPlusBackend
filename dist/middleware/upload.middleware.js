"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorUploadManagementMiddleware = exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uploadDir = 'images/';
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
const limits = { fileSize: 1 * 1024 * 1024 };
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Type de fichier non autorisé. Seules les images JPEG, PNG ou WEBP sont acceptées.'));
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter, limits });
const errorUploadManagementMiddleware = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({ message: err.message });
    }
    else {
        next(err);
    }
};
exports.errorUploadManagementMiddleware = errorUploadManagementMiddleware;
