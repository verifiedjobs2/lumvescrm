import User from './User';
import Customer from './Customer';
import Product from './Product';
import Call from './Call';
import CallProduct from './CallProduct';
import Lead from './Lead';
import Order from './Order';
import OrderItem from './OrderItem';
import FollowUp from './FollowUp';
import ActivityLog from './ActivityLog';

// User associations
User.hasMany(Customer, { foreignKey: 'created_by', as: 'customers' });
User.hasMany(Call, { foreignKey: 'agent_id', as: 'calls' });
User.hasMany(Lead, { foreignKey: 'agent_id', as: 'leads' });
User.hasMany(Order, { foreignKey: 'agent_id', as: 'orders' });
User.hasMany(FollowUp, { foreignKey: 'agent_id', as: 'followUps' });
User.hasMany(ActivityLog, { foreignKey: 'user_id', as: 'activityLogs' });

// Customer associations
Customer.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Customer.hasMany(Call, { foreignKey: 'customer_id', as: 'calls' });
Customer.hasMany(Lead, { foreignKey: 'customer_id', as: 'leads' });
Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });

// Call associations
Call.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
Call.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });
Call.belongsToMany(Product, { through: CallProduct, foreignKey: 'call_id', as: 'products' });

// Product associations
Product.belongsToMany(Call, { through: CallProduct, foreignKey: 'product_id', as: 'calls' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });

// Lead associations
Lead.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
Lead.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });
Lead.hasMany(FollowUp, { foreignKey: 'lead_id', as: 'followUps' });

// Order associations
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
Order.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// FollowUp associations
FollowUp.belongsTo(Lead, { foreignKey: 'lead_id', as: 'lead' });
FollowUp.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });

// ActivityLog associations
ActivityLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export {
  User,
  Customer,
  Product,
  Call,
  CallProduct,
  Lead,
  Order,
  OrderItem,
  FollowUp,
  ActivityLog,
};
