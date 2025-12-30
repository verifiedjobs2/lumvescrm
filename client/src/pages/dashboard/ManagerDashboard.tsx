import React from 'react';
import {
  HiUsers,
  HiCurrencyRupee,
  HiShoppingCart,
  HiTrendingUp,
  HiPhone,
  HiUserGroup,
} from 'react-icons/hi';
import { StatsCard, Card } from '../../components/common';

const ManagerDashboard: React.FC = () => {

  // Mock data - will be replaced with API calls in Phase 4
  const stats = {
    totalAgents: 25,
    activeLeads: 156,
    ordersThisMonth: 45,
    revenueThisMonth: 2450000,
    conversionRate: 28,
    totalCalls: 520,
  };

  const topAgents = [
    { id: 1, name: 'Rajesh Kumar', calls: 85, conversions: 12, rate: 14.1 },
    { id: 2, name: 'Meera Sharma', calls: 72, conversions: 10, rate: 13.9 },
    { id: 3, name: 'Anil Verma', calls: 68, conversions: 9, rate: 13.2 },
    { id: 4, name: 'Sunita Patel', calls: 65, conversions: 8, rate: 12.3 },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro Max', inquiries: 45 },
    { name: 'Samsung Galaxy S24', inquiries: 38 },
    { name: 'MacBook Pro 14"', inquiries: 32 },
    { name: 'Sony Bravia 55"', inquiries: 28 },
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
        <h1 className="text-2xl font-bold text-gray-900">
          Team Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor your team's performance and sales metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Agents"
          value={stats.totalAgents}
          icon={<HiUsers className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Active Leads"
          value={stats.activeLeads}
          icon={<HiUserGroup className="w-6 h-6" />}
          color="yellow"
        />
        <StatsCard
          title="Orders This Month"
          value={stats.ordersThisMonth}
          icon={<HiShoppingCart className="w-6 h-6" />}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Revenue This Month"
          value={formatCurrency(stats.revenueThisMonth)}
          icon={<HiCurrencyRupee className="w-6 h-6" />}
          color="purple"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={<HiTrendingUp className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Total Calls This Month"
          value={stats.totalCalls}
          icon={<HiPhone className="w-6 h-6" />}
          color="blue"
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Agents */}
        <Card title="Top Performing Agents" subtitle="Based on conversion rate">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Agent</th>
                  <th className="pb-3 font-medium text-center">Calls</th>
                  <th className="pb-3 font-medium text-center">Conversions</th>
                  <th className="pb-3 font-medium text-right">Rate</th>
                </tr>
              </thead>
              <tbody>
                {topAgents.map((agent, index) => (
                  <tr
                    key={agent.id}
                    className="border-t border-gray-100"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">
                          {agent.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-center text-gray-600">{agent.calls}</td>
                    <td className="py-3 text-center text-gray-600">
                      {agent.conversions}
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-green-600 font-medium">
                        {agent.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-700">
            View all agents &rarr;
          </button>
        </Card>

        {/* Top Inquired Products */}
        <Card title="Top Inquired Products" subtitle="Most discussed products this month">
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.inquiries} inquiries
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{
                        width: `${(product.inquiries / topProducts[0].inquiries) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-700">
            View product analytics &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
