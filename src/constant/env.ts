export const envs = {
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
} as const;
