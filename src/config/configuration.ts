export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  googleRedirect: process.env.GOOGLE_REDIRECT,
  corsOrigin: process.env.CORS_ORIGIN,
});
