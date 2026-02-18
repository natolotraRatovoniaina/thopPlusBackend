import { Request, Response } from 'express';
import { authLoginService } from '../../service/auth/login.service';
import { UserType } from '../../typescript/UserType';

const authLoginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as UserType;

    const result = await authLoginService(res, username, password);

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
  }
};

export default authLoginController;
