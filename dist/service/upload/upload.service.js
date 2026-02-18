"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = void 0;
const uploadService = (filename) => {
    try {
        return {
            status: 200,
            data: { message: 'Image uploadée avec succès !', filePath: `/images/${filename}` },
        };
    }
    catch (error) {
        return { status: 500, data: { message: "Erreur lors de l'upload", error: error.message } };
    }
};
exports.uploadService = uploadService;
