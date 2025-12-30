# Lumves CRM - User Guide
## Phone Sales Management System

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Login & Authentication](#login--authentication)
3. [Dashboard Overview](#dashboard-overview)
4. [User Roles & Permissions](#user-roles--permissions)
5. [Navigation Guide](#navigation-guide)
6. [Phase 1 Features (Current)](#phase-1-features-current)
7. [Upcoming Features](#upcoming-features)
8. [FAQ](#faq)

---

## Getting Started

### Accessing the CRM
Open your web browser and navigate to:
- **URL**: http://84.247.136.87
- **Future Domain**: https://crm.lumves.com

### Supported Browsers
- Google Chrome (Recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

### System Requirements
- Desktop or laptop computer
- Stable internet connection
- Screen resolution: 1366x768 or higher (recommended)

---

## Login & Authentication

### How to Login
1. Open the CRM URL in your browser
2. Enter your email address
3. Enter your password
4. Click "Sign In"

### Default Test Accounts

| Role    | Email                  | Password    | Access Level |
|---------|------------------------|-------------|--------------|
| Admin   | admin@lumves.com       | admin123    | Full Access  |
| Manager | manager@lumves.com     | manager123  | Team Access  |
| Agent   | agent@lumves.com       | agent123    | Personal     |

### Security Features
- Sessions expire after 24 hours of inactivity
- Passwords are securely encrypted
- Failed login attempts are logged

### Logging Out
Click on your name in the top-right corner and select "Logout"

---

## Dashboard Overview

### Agent Dashboard
When you log in as an Agent, you'll see:

**Statistics Cards:**
- Calls Today - Number of calls made today
- Pending Follow-ups - Tasks requiring attention
- Conversion Rate - Your personal success rate
- Today's Tasks - Scheduled activities for today
- Active Leads - Leads currently in your pipeline
- Calls This Week - Weekly call volume

**Recent Calls Section:**
- Shows your latest call activities
- Displays customer name, outcome, and time
- Quick access to call history

**Upcoming Tasks Section:**
- Lists scheduled follow-ups
- Shows task type and scheduled time
- Helps prioritize your day

### Manager Dashboard
Managers see team-level statistics:

**Team Metrics:**
- Total Agents - Number of team members
- Active Leads - Total leads in pipeline
- Orders This Month - Team's monthly orders
- Revenue This Month - Total revenue generated
- Conversion Rate - Team's average success rate
- Total Calls - Monthly call volume

**Top Performing Agents Table:**
- Rankings based on conversion rate
- Shows calls, conversions, and success rate
- Helps identify top performers

**Top Inquired Products:**
- Most discussed products
- Inquiry counts with visual bars
- Helps with inventory planning

### Admin Dashboard
Administrators have system-wide visibility:

**System Statistics:**
- Total Users - All registered users
- Active Users - Currently active accounts
- Total Products - Product catalog size
- Low Stock Items - Inventory alerts
- Total Orders - All-time order count
- Total Revenue - All-time revenue

**Quick Actions:**
- User Management - Create/edit users
- Product Catalog - Manage inventory
- Reports - View analytics
- Settings - System configuration

**Recent Activity:**
- System-wide activity log
- User actions and timestamps
- Audit trail for compliance

---

## User Roles & Permissions

### Agent Role
**Can Access:**
- Personal dashboard
- Customer management (own customers)
- Call logging (own calls)
- Lead management (assigned leads)
- Order creation
- Follow-up scheduling
- Product catalog (view only)

**Cannot Access:**
- Team statistics
- Other agents' data
- User management
- System settings

### Manager Role
**Can Access:**
- Everything Agents can access
- Team performance dashboard
- All agents' statistics
- Team reports and analytics
- Lead assignment

**Cannot Access:**
- User management
- System settings
- Product catalog editing

### Admin Role
**Full Access Including:**
- All Manager capabilities
- User management (create/edit/deactivate)
- Product catalog management
- System settings
- Activity logs
- Database management

---

## Navigation Guide

### Sidebar Menu

**Sales Section:**
| Menu Item  | Description                    |
|------------|--------------------------------|
| Dashboard  | Main overview page             |
| Customers  | Customer database (Phase 2)    |
| Call Logs  | Call history & logging (Phase 2)|
| Leads      | Lead management (Phase 2)      |
| Orders     | Order management (Phase 3)     |

**Catalog Section:**
| Menu Item  | Description                    |
|------------|--------------------------------|
| Products   | Product catalog (Phase 3)      |

**Tasks Section:**
| Menu Item   | Description                   |
|-------------|-------------------------------|
| Follow-ups  | Task management (Phase 4)     |

**Reports Section (Manager/Admin):**
| Menu Item  | Description                    |
|------------|--------------------------------|
| Analytics  | Reports & charts (Phase 4)     |

**Admin Section (Admin only):**
| Menu Item       | Description                 |
|-----------------|------------------------------|
| User Management | Create/edit users (Phase 5)  |

### Header Bar Features
- **Search Bar** - Quick search across the system
- **Notifications** - Alerts and reminders
- **Profile Menu** - Account settings and logout

---

## Phase 1 Features (Current)

### What's Included in Phase 1

**Authentication System:**
- Secure login/logout
- JWT-based session management
- Role-based access control
- Password security

**User Interface:**
- Professional blue/white design
- Responsive sidebar navigation
- Role-specific dashboards
- Toast notifications for actions

**Dashboard:**
- Agent statistics (mock data for demo)
- Manager team overview (mock data for demo)
- Admin system overview (mock data for demo)
- Quick action cards

**Backend API:**
- User authentication endpoints
- User management endpoints (Admin)
- Health check endpoint
- Rate limiting for security

### Testing Phase 1

1. **Login as different roles** - Try all three accounts
2. **Explore dashboards** - Note the different views per role
3. **Navigate the sidebar** - Check all menu items
4. **Test logout** - Verify session ends properly
5. **Try the search bar** - UI is ready, functionality coming

---

## Upcoming Features

### Phase 2 - Core CRM
- Customer database with full CRUD
- Call logging with outcome tracking
- Lead management with status workflow
- Search and filter functionality
- Customer interaction history

### Phase 3 - Commerce
- Product catalog management
- Real-time inventory tracking
- Low stock alerts
- Order management system
- Order status tracking

### Phase 4 - Productivity & Analytics
- Follow-up scheduling system
- Calendar view for tasks
- Overdue task alerts
- Agent performance reports
- Team analytics with charts
- Export to CSV/Excel

### Phase 5 - Polish & Deploy
- Complete user management UI
- Activity logging
- System settings
- SSL certificate setup
- Production optimization

---

## FAQ

### General Questions

**Q: What browsers work best with Lumves CRM?**
A: Google Chrome is recommended for the best experience.

**Q: Can I access the CRM on mobile?**
A: The system is desktop-optimized but will work on tablets. Mobile support is planned for future updates.

**Q: How often should I change my password?**
A: We recommend changing passwords every 90 days for security.

### Login Issues

**Q: I forgot my password. What do I do?**
A: Contact your administrator to reset your password.

**Q: Why does my session expire?**
A: Sessions automatically expire after 24 hours for security.

### Dashboard Questions

**Q: Why is some data showing as "Coming Soon"?**
A: This is Phase 1, which includes authentication and dashboard framework. Full functionality will be added in subsequent phases.

**Q: The numbers on my dashboard seem wrong?**
A: Current dashboard displays demo data. Real data will populate after Phase 2 is complete.

### Feature Requests

**Q: Can I request new features?**
A: Yes! Please submit feature requests to your administrator for consideration in future phases.

---

## Support & Feedback

For technical support or feedback on this Phase 1 release, please contact:

- **Email**: support@lumves.com
- **Documentation**: This user guide

---

## Version History

| Version | Date       | Changes                    |
|---------|------------|----------------------------|
| 1.0     | Dec 2024   | Phase 1 Release            |
|         |            | - Authentication system    |
|         |            | - Role-based dashboards    |
|         |            | - User management API      |
|         |            | - Basic UI framework       |

---

*This document will be updated as new features are released.*

**Lumves CRM v1.0 - Phase 1**
