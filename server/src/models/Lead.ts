import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface LeadAttributes {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority?: 'low' | 'medium' | 'high';
  budget?: number;
  notes?: string;
  assigned_to?: number;
  last_contact?: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface LeadCreationAttributes extends Optional<LeadAttributes, 'id' | 'status' | 'priority' | 'created_at' | 'updated_at'> {}

class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public company!: string;
  public source!: string;
  public status!: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  public priority!: 'low' | 'medium' | 'high';
  public budget!: number;
  public notes!: string;
  public assigned_to!: number;
  public last_contact!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Lead.init(
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
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'),
      defaultValue: 'new',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    budget: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    last_contact: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'leads',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Lead;
