import { Request, Response } from 'express';
import { authRegisterService } from '../../service/auth/register.service';
import { RegisterDataType } from '../../typescript/RegisterDataType';

const authRegisterController = async (req: Request, res: Response) => {
  try {
    const data = req.body as RegisterDataType;

    const result = await authRegisterService(res, data);

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

export default authRegisterController;
