import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CallProductAttributes {
  id: number;
  call_id: number;
  product_id: number;
}

interface CallProductCreationAttributes extends Optional<CallProductAttributes, 'id'> {}

class CallProduct extends Model<CallProductAttributes, CallProductCreationAttributes> implements CallProductAttributes {
  public id!: number;
  public call_id!: number;
  public product_id!: number;
}

CallProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    call_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'calls',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'call_products',
    timestamps: false,
  }
);

export default CallProduct;
