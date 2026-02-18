"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRefreshCookie = exports.setRefreshCookie = void 0;
const setRefreshCookie = (res, token) => {
    res.cookie('refresh_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/auth/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
exports.setRefreshCookie = setRefreshCookie;
const clearRefreshCookie = (res) => {
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
};
exports.clearRefreshCookie = clearRefreshCookie;
