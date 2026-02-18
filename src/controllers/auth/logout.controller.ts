import { Request, Response } from 'express';
import { authLogoutService } from '../../service/auth/logout.service';
import { ResponseLogoutType } from '../../typescript/ResponseAuthType';

const authLogoutController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refresh_token as string | undefined;

    console.log(token, req.cookies);

    const result = (await authLogoutService(res, token)) as ResponseLogoutType;

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

export default authLogoutController;
