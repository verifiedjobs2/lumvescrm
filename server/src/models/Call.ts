import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CallAttributes {
  id: number;
  customer_id: number;
  agent_id: number;
  call_date: Date;
  duration_minutes?: number;
  outcome: 'interested' | 'not_interested' | 'callback' | 'converted' | 'no_answer';
  notes?: string;
  created_at?: Date;
}

interface CallCreationAttributes extends Optional<CallAttributes, 'id' | 'created_at'> {}

class Call extends Model<CallAttributes, CallCreationAttributes> implements CallAttributes {
  public id!: number;
  public customer_id!: number;
  public agent_id!: number;
  public call_date!: Date;
  public duration_minutes!: number;
  public outcome!: 'interested' | 'not_interested' | 'callback' | 'converted' | 'no_answer';
  public notes!: string;
  public readonly created_at!: Date;
}

Call.init(
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
    call_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    outcome: {
      type: DataTypes.ENUM('interested', 'not_interested', 'callback', 'converted', 'no_answer'),
      allowNull: false,
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
    tableName: 'calls',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

export default Call;
