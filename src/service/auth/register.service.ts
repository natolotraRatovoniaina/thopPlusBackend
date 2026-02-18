import { randomUUID } from 'crypto';
import { Response } from 'express';
import { RegisterDataType } from '../../typescript/RegisterDataType';
import { ResponseRegisterType } from '../../typescript/ResponseAuthType';
import { signRefreshToken } from '../../utils/jwt';
import validRefreshTokenJTIs from '../../utils/tokenStore';
import { setRefreshCookie } from './utils/refresh.service.utils';
import {
  healthCenterUserRegister,
  simpleUserRegister,
  staffUserRegister,
  userTypeChecker,
} from './utils/register.service.utils';

export const authRegisterService = async (res: Response, data: RegisterDataType) => {
  let result: ResponseRegisterType;

  const { role, staff, healthCenter, general, url } = data;

  console.log(url);

  if (!role || !general)
    return { status: 400, data: { error: 'Il y a des informations manquant' } };

  const userType = userTypeChecker(role, staff);

  if (userType === 'Simple') result = await simpleUserRegister(general, url);
  else if (userType === 'Staff') result = await staffUserRegister(general, url, staff);
  else result = await healthCenterUserRegister(general, url, healthCenter);

  const jti = randomUUID();

  validRefreshTokenJTIs.add(jti);

  const refreshToken = signRefreshToken(
    { id: result.userInfo.id, username: result.userInfo.username },
    jti,
  );

  setRefreshCookie(res, refreshToken);

  result.data.expiresIn = process.env.ACCESS_TOKEN_TTL;

  return result;
};
