export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10) || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  // REDIS_HOST: process.env.REDIS_HOST,
  // REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
});
