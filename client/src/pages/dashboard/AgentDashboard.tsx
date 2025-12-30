import React from 'react';
import {
  HiPhone,
  HiCalendar,
  HiCheckCircle,
  HiTrendingUp,
  HiClock,
  HiUserGroup,
} from 'react-icons/hi';
import { StatsCard, Card } from '../../components/common';
import { useAuth } from '../../context/AuthContext';

const AgentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - will be replaced with API calls in Phase 2
  const stats = {
    callsToday: 12,
    callsThisWeek: 45,
    pendingFollowUps: 8,
    conversionRate: 23,
    todaysTasks: 5,
    activeLeads: 15,
  };

  const recentCalls = [
    { id: 1, customer: 'Rahul Sharma', outcome: 'Interested', time: '10:30 AM' },
    { id: 2, customer: 'Priya Patel', outcome: 'Callback', time: '11:15 AM' },
    { id: 3, customer: 'Amit Singh', outcome: 'Converted', time: '2:00 PM' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with Vikram', type: 'callback', time: '3:00 PM' },
    { id: 2, task: 'Send quote to Neha', type: 'send_quote', time: '4:30 PM' },
    { id: 3, task: 'Demo for Suresh', type: 'demo', time: 'Tomorrow 10:00 AM' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 mt-1">Here's your sales overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Calls Today"
          value={stats.callsToday}
          icon={<HiPhone className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Pending Follow-ups"
          value={stats.pendingFollowUps}
          icon={<HiCalendar className="w-6 h-6" />}
          color="yellow"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={<HiTrendingUp className="w-6 h-6" />}
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Today's Tasks"
          value={stats.todaysTasks}
          icon={<HiCheckCircle className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title="Active Leads"
          value={stats.activeLeads}
          icon={<HiUserGroup className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Calls This Week"
          value={stats.callsThisWeek}
          icon={<HiClock className="w-6 h-6" />}
          color="green"
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <Card title="Recent Calls" subtitle="Your latest call activities">
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{call.customer}</p>
                  <p className="text-sm text-gray-500">{call.time}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    call.outcome === 'Converted'
                      ? 'bg-green-100 text-green-700'
                      : call.outcome === 'Interested'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {call.outcome}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-700">
            View all calls &rarr;
          </button>
        </Card>

        {/* Upcoming Tasks */}
        <Card title="Upcoming Tasks" subtitle="Your scheduled follow-ups">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    task.type === 'callback'
                      ? 'bg-blue-100 text-blue-600'
                      : task.type === 'send_quote'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-purple-100 text-purple-600'
                  }`}
                >
                  {task.type === 'callback' ? (
                    <HiPhone className="w-5 h-5" />
                  ) : task.type === 'send_quote' ? (
                    <HiCheckCircle className="w-5 h-5" />
                  ) : (
                    <HiCalendar className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-500">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-700">
            View all tasks &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
