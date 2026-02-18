import { randomUUID } from 'crypto';
import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseRefreshType } from '../../typescript/ResponseAuthType';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';
import validRefreshTokenJTIs from '../../utils/tokenStore';
import { setRefreshCookie } from './utils/refresh.service.utils';

export const authRefreshService = async (
  res: Response,
  token: string | undefined,
): Promise<ResponseRefreshType> => {
  if (!token) return { status: 401, data: { error: 'Refresh token manquant' } };

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload & {
      jti: string;
    };

    const jti = decoded.jti;

    if (!jti || !validRefreshTokenJTIs.has(jti)) {
      return { status: 401, data: { error: 'Refresh token revoque' } };
    }

    validRefreshTokenJTIs.delete(jti);

    const newAccess = signAccessToken({
      id: decoded.id,
      username: decoded.username,
    });

    const newJti = randomUUID();

    validRefreshTokenJTIs.add(newJti);

    const newRefresh = signRefreshToken({ id: decoded.id, username: decoded.username }, newJti);

    setRefreshCookie(res, newRefresh);

    return {
      status: 200,
      data: { accessToken: newAccess, expiresIn: process.env.ACCESS_TOKEN_TTL },
    };
  } catch {
    return { status: 401, data: { error: 'Refresh token invalide ou expire' } };
  }
};
