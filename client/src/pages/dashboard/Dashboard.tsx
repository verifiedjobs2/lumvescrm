import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AgentDashboard from './AgentDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'agent':
    default:
      return <AgentDashboard />;
  }
};

export default Dashboard;
