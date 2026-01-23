export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3333),

  JWT_SECRET: process.env.JWT_SECRET ?? 'dev_secret_change_me',

  // opcional: se quiser mudar expiração
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
}
