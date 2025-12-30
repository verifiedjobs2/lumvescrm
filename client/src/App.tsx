import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout';

// Pages
import Login from './pages/auth/Login';
import { Dashboard } from './pages/dashboard';
import CustomerList from './pages/customers/CustomerList';
import CallList from './pages/calls/CallList';
import LeadList from './pages/leads/LeadList';
import ProductList from './pages/products/ProductList';
import OrderList from './pages/orders/OrderList';
import FollowUpList from './pages/followups/FollowUpList';
import Reports from './pages/reports/Reports';
import UserManagement from './pages/admin/UserManagement';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/calls" element={<CallList />} />
            <Route path="/leads" element={<LeadList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/follow-ups" element={<FollowUpList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
