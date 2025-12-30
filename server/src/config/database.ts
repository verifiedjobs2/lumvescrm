import { Sequelize, Dialect } from 'sequelize';
import { config } from './config';

const isSqlite = config.db.dialect === 'sqlite';
const hasConnectionUrl = !!config.db.url;

const createSequelize = (): Sequelize => {
  // Use DATABASE_URL if provided (for production with Supabase/Neon)
  if (hasConnectionUrl) {
    return new Sequelize(config.db.url, {
      dialect: 'postgres',
      logging: config.nodeEnv === 'development' ? console.log : false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    });
  }

  // SQLite for local development
  if (isSqlite) {
    return new Sequelize({
      dialect: 'sqlite',
      storage: config.db.storage,
      logging: config.nodeEnv === 'development' ? console.log : false,
      define: {
        timestamps: true,
        underscored: true,
      },
    });
  }

  // MySQL/PostgreSQL with individual config
  return new Sequelize(
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
};

export const sequelize = createSequelize();

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    const dbType = hasConnectionUrl ? 'postgres' : config.db.dialect;
    console.log(`Database connected successfully (${dbType})`);

    // Sync models with database
    // Use alter in development, sync in production for initial setup
    await sequelize.sync({ alter: config.nodeEnv === 'development' });
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
