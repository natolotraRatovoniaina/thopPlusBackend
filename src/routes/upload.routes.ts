import { Router } from 'express';
import { uploadController } from '../controllers/upload/upload.controller';
import { errorUploadManagementMiddleware, upload } from '../middleware/upload.middleware';

const uploadRoute = Router();

uploadRoute.post('/upload', upload.single('photo'), uploadController);

uploadRoute.use(errorUploadManagementMiddleware);

export default uploadRoute;
