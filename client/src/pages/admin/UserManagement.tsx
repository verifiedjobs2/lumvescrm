import React from 'react';
import { Card } from '../../components/common';

const UserManagement: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-1">Manage agents, managers, and administrators.</p>
      </div>

      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚧</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500">User management UI will be completed in Phase 5.</p>
          <p className="text-sm text-gray-400 mt-2">API endpoints are already available at /api/users</p>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
