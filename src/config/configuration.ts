export const configuration = () => ({
  port: Number(process.env.PORT),
  cors: process.env.CORS === 'true',
  logger: process.env.LOGGER === 'true',
  loggerLevels: process.env.LOGGER_LEVELS.split(',') || [],
  database: {
    type: 'mysql',
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME || 'operation-management',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
