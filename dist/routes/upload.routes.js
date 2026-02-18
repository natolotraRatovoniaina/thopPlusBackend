"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload/upload.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
const uploadRoute = (0, express_1.Router)();
uploadRoute.post('/upload', upload_middleware_1.upload.single('photo'), upload_controller_1.uploadController);
uploadRoute.use(upload_middleware_1.errorUploadManagementMiddleware);
exports.default = uploadRoute;
