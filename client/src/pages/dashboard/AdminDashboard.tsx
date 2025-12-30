import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiUsers,
  HiCurrencyRupee,
  HiShoppingCart,
  HiCube,
  HiDatabase,
  HiCog,
} from 'react-icons/hi';
import { StatsCard, Card } from '../../components/common';

const AdminDashboard: React.FC = () => {
  // Mock data - will be replaced with API calls
  const systemStats = {
    totalUsers: 108,
    activeUsers: 95,
    totalProducts: 156,
    lowStockProducts: 12,
    totalOrders: 1250,
    totalRevenue: 15600000,
  };

  const recentActivity = [
    { id: 1, action: 'New user created', user: 'Admin', time: '5 mins ago' },
    { id: 2, action: 'Product updated', user: 'Manager', time: '15 mins ago' },
    { id: 3, action: 'Order completed', user: 'Agent', time: '30 mins ago' },
    { id: 4, action: 'System backup', user: 'System', time: '1 hour ago' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          System overview and administrative controls.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={systemStats.totalUsers}
          icon={<HiUsers className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Active Users"
          value={systemStats.activeUsers}
          icon={<HiUsers className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Total Products"
          value={systemStats.totalProducts}
          icon={<HiCube className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title="Low Stock Items"
          value={systemStats.lowStockProducts}
          icon={<HiCube className="w-6 h-6" />}
          color="red"
        />
        <StatsCard
          title="Total Orders"
          value={systemStats.totalOrders}
          icon={<HiShoppingCart className="w-6 h-6" />}
          color="yellow"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(systemStats.totalRevenue)}
          icon={<HiCurrencyRupee className="w-6 h-6" />}
          color="green"
        />
      </div>

      {/* Quick Actions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card title="Quick Actions" subtitle="Administrative shortcuts">
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <HiUsers className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">User Management</p>
                <p className="text-sm text-gray-500">Manage agents & roles</p>
              </div>
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <HiCube className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Product Catalog</p>
                <p className="text-sm text-gray-500">Manage inventory</p>
              </div>
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <HiDatabase className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Reports</p>
                <p className="text-sm text-gray-500">View analytics</p>
              </div>
            </Link>

            <Link
              to="/admin/settings"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <HiCog className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Settings</p>
                <p className="text-sm text-gray-500">System configuration</p>
              </div>
            </Link>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity" subtitle="Latest system events">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    by {activity.user} - {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-700">
            View all activity &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
