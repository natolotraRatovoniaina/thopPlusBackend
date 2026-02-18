import { Response } from 'express';

export const setRefreshCookie = (res: Response, token: string) => {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/auth/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearRefreshCookie = (res: Response) => {
  res.clearCookie('refresh_token', { path: '/auth/refresh' });
};
