import jwt from 'jsonwebtoken';

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_TTL,
  });
};

export const signRefreshToken = (payload: object, jti: string) => {
  return jwt.sign({ ...payload, jti }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_TTL,
  });
};
