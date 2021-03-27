module.exports = {
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['database/migrations/*.js'],
  cli: {
    migrationsDir: 'database/migrations',
  },
  migrationsRun: true,
};
