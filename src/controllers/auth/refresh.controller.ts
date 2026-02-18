import { Request, Response } from 'express';
import { authRefreshService } from '../../service/auth/refresh.service';
import { ResponseRefreshType } from '../../typescript/ResponseAuthType';

const authRefreshController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refresh_token as string | undefined;

    const result = (await authRefreshService(res, token)) as ResponseRefreshType;

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
  }
};

export default authRefreshController;
