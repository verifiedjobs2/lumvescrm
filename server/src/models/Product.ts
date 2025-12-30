import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProductAttributes {
  id: number;
  name: string;
  category: 'smartphones' | 'laptops' | 'tvs' | 'kitchen_appliances' | 'home_electronics';
  sku?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
  is_active: boolean;
  created_at?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'stock_quantity' | 'is_active' | 'created_at'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public category!: 'smartphones' | 'laptops' | 'tvs' | 'kitchen_appliances' | 'home_electronics';
  public sku!: string;
  public price!: number;
  public stock_quantity!: number;
  public image_url!: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('smartphones', 'laptops', 'tvs', 'kitchen_appliances', 'home_electronics'),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

export default Product;
