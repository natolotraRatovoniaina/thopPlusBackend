import { Request, Response } from 'express';
import { uploadService } from '../../service/upload/upload.service';
import { ResponseUploadType } from '../../typescript/ResponseUploadType';

export const uploadController = async (req: Request, res: Response) => {
  const filename = req.file.filename;

  const result = uploadService(filename) as ResponseUploadType;

  return res.status(result.status).json(result.data);
};
