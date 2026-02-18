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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const upload_service_1 = require("../../service/upload/upload.service");
const uploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.file.filename;
    const result = (0, upload_service_1.uploadService)(filename);
    return res.status(result.status).json(result.data);
});
exports.uploadController = uploadController;
