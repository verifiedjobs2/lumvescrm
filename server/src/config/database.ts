import { Sequelize, Dialect } from 'sequelize';
import { config } from './config';

const isSqlite = config.db.dialect === 'sqlite';

export const sequelize = isSqlite
  ? new Sequelize({
      dialect: 'sqlite',
      storage: config.db.storage,
      logging: config.nodeEnv === 'development' ? console.log : false,
      define: {
        timestamps: true,
        underscored: true,
      },
    })
  : new Sequelize(
      config.db.name,
      config.db.user,
      config.db.password,
      {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect as Dialect,
        logging: config.nodeEnv === 'development' ? console.log : false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: true,
          underscored: true,
        },
      }
    );

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully (${config.db.dialect})`);

    // Sync models with database (in development)
    if (config.nodeEnv === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
