import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiHome,
  HiUsers,
  HiPhone,
  HiUserGroup,
  HiShoppingCart,
  HiCube,
  HiCalendar,
  HiChartBar,
  HiCog,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin';

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">Lumves CRM</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavItem to="/" icon={<HiHome className="w-5 h-5" />} label="Dashboard" />

        <div className="pt-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Sales
          </p>
        </div>

        <NavItem
          to="/customers"
          icon={<HiUsers className="w-5 h-5" />}
          label="Customers"
        />
        <NavItem
          to="/calls"
          icon={<HiPhone className="w-5 h-5" />}
          label="Call Logs"
        />
        <NavItem
          to="/leads"
          icon={<HiUserGroup className="w-5 h-5" />}
          label="Leads"
        />
        <NavItem
          to="/orders"
          icon={<HiShoppingCart className="w-5 h-5" />}
          label="Orders"
        />

        <div className="pt-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Catalog
          </p>
        </div>

        <NavItem
          to="/products"
          icon={<HiCube className="w-5 h-5" />}
          label="Products"
        />

        <div className="pt-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Tasks
          </p>
        </div>

        <NavItem
          to="/follow-ups"
          icon={<HiCalendar className="w-5 h-5" />}
          label="Follow-ups"
        />

        {isManagerOrAdmin && (
          <>
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Reports
              </p>
            </div>
            <NavItem
              to="/reports"
              icon={<HiChartBar className="w-5 h-5" />}
              label="Analytics"
            />
          </>
        )}

        {isAdmin && (
          <>
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Admin
              </p>
            </div>
            <NavItem
              to="/admin/users"
              icon={<HiCog className="w-5 h-5" />}
              label="User Management"
            />
          </>
        )}
      </nav>

      {/* User info at bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
