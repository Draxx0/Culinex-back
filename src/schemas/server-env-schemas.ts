import z from 'zod';

const envSchema = z.object({
  POSTGRES_HOST: z.string().trim().min(1),
  POSTGRES_PORT: z.string().trim().min(1),
  POSTGRES_USERNAME: z.string().trim().min(1),
  POSTGRES_PASSWORD: z.string().trim().min(1),
  POSTGRES_DATABASE: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  PORT: z.string().trim().min(1),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  // REDIS_HOST: z.string().trim().min(1),
  // REDIS_PORT: z.string().trim().min(1),
});

export const validateEnvVariables = ({
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  JWT_SECRET,
  PORT,
  NODE_ENV,
  // REDIS_HOST,
  // REDIS_PORT,
}) => {
  const envServer = envSchema.safeParse({
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    JWT_SECRET,
    PORT,
    NODE_ENV,
    // REDIS_HOST,
    // REDIS_PORT,
  });

  if (!envServer.success) {
    console.error(
      "An error occurred while validating the server's environment variables",
    );
    throw new Error('There is an error with the server environment variables');
  }

  return envServer.data;
};
