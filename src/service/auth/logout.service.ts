import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseLogoutType } from '../../typescript/ResponseAuthType';
import validRefreshTokenJTIs from '../../utils/tokenStore';
import { clearRefreshCookie } from './utils/refresh.service.utils';

export const authLogoutService = async (
  res: Response,
  token: string | undefined,
): Promise<ResponseLogoutType> => {
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload & {
      jti: string;
    };

    if (decoded.jti) {
      validRefreshTokenJTIs.delete(decoded.jti);

      clearRefreshCookie(res);

      return { status: 200, data: { message: 'Deconnecte' } };
    }
  }
  return { status: 400, data: { error: 'Utilisateur deja deconnecte' } };
};
