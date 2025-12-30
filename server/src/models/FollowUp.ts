import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface FollowUpAttributes {
  id: number;
  lead_id: number;
  agent_id: number;
  scheduled_date: Date;
  task_type: 'callback' | 'send_quote' | 'follow_up' | 'demo' | 'other';
  completed: boolean;
  completed_at?: Date;
  notes?: string;
  created_at?: Date;
}

interface FollowUpCreationAttributes extends Optional<FollowUpAttributes, 'id' | 'completed' | 'created_at'> {}

class FollowUp extends Model<FollowUpAttributes, FollowUpCreationAttributes> implements FollowUpAttributes {
  public id!: number;
  public lead_id!: number;
  public agent_id!: number;
  public scheduled_date!: Date;
  public task_type!: 'callback' | 'send_quote' | 'follow_up' | 'demo' | 'other';
  public completed!: boolean;
  public completed_at!: Date;
  public notes!: string;
  public readonly created_at!: Date;
}

FollowUp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'leads',
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
    scheduled_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    task_type: {
      type: DataTypes.ENUM('callback', 'send_quote', 'follow_up', 'demo', 'other'),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'follow_ups',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

export default FollowUp;
