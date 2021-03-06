export const jwtConfiguration = {
    secretKey: process.env.UNIAPP_JWT_SECRET_KEY || 'secret',
    expireTime: 60 * 60 * 24 * 7, // 7 days
    cookieName: 'uniapp_user'
};