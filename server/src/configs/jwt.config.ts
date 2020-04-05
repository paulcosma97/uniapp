export const jwtConfiguration = {
    secretKey: process.env.UNIAPP_JWT_SECRET_KEY || (Date.now() + ''),
    expireTime: 1000 * 60 * 60 * 24 * 7, // 7 days
};