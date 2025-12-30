import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CustomerAttributes {
  id: number;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  state: string;
  source: 'website' | 'direct_call' | 'referral' | 'other';
  status: 'new' | 'active' | 'converted' | 'inactive';
  created_by: number;
  last_contacted?: Date;
  created_at?: Date;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id' | 'state' | 'status' | 'created_at'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public city!: string;
  public state!: string;
  public source!: 'website' | 'direct_call' | 'referral' | 'other';
  public status!: 'new' | 'active' | 'converted' | 'inactive';
  public created_by!: number;
  public last_contacted!: Date;
  public readonly created_at!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      defaultValue: 'Rajasthan',
    },
    source: {
      type: DataTypes.ENUM('website', 'direct_call', 'referral', 'other'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'active', 'converted', 'inactive'),
      defaultValue: 'new',
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    last_contacted: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

export default Customer;
