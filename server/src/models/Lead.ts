import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface LeadAttributes {
  id: number;
  customer_id: number;
  agent_id: number;
  status: 'new' | 'contacted' | 'interested' | 'followup_scheduled' | 'converted' | 'lost';
  interest_level: 'hot' | 'warm' | 'cold';
  created_at?: Date;
  updated_at?: Date;
}

interface LeadCreationAttributes extends Optional<LeadAttributes, 'id' | 'status' | 'created_at' | 'updated_at'> {}

class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: number;
  public customer_id!: number;
  public agent_id!: number;
  public status!: 'new' | 'contacted' | 'interested' | 'followup_scheduled' | 'converted' | 'lost';
  public interest_level!: 'hot' | 'warm' | 'cold';
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
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'interested', 'followup_scheduled', 'converted', 'lost'),
      defaultValue: 'new',
    },
    interest_level: {
      type: DataTypes.ENUM('hot', 'warm', 'cold'),
      allowNull: false,
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
