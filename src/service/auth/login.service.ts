import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import User from '../../models/User';
import { ResponseLoginType } from '../../typescript/ResponseAuthType';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';
import validRefreshTokenJTIs from '../../utils/tokenStore';
import { setRefreshCookie } from './utils/refresh.service.utils';

export const authLoginService = async (
  res: Response,
  username: string,
  password: string,
): Promise<ResponseLoginType> => {
  if (!username || !password) return { status: 400, data: { error: 'Informations manquantes' } };
  try {
    const user: any = await User.findOne({ where: { username: username } });

    const passwordHash = user.password as string;

    if (!user) return { status: 400, data: { error: 'Utilisateur introuvable' } };

    const passwdOk = await bcrypt.compare(password, passwordHash);

    if (!passwdOk) return { status: 400, data: { error: 'Mot de passe incorrect' } };

    const accessToken = signAccessToken({
      id: user.id,
      username: user.username,
    });

    const jti = randomUUID();

    validRefreshTokenJTIs.add(jti);

    const refreshToken = signRefreshToken({ id: user.id, username: user.username }, jti);

    setRefreshCookie(res, refreshToken);

    return {
      status: 200,
      data: {
        message: 'Utilisateur desormais connecte',
        accessToken,
        expiresIn: process.env.ACCESS_TOKEN_TTL,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
