import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

type Role = 'agent' | 'manager' | 'admin';

// Role hierarchy: admin > manager > agent
const roleHierarchy: Record<Role, number> = {
  agent: 1,
  manager: 2,
  admin: 3,
};

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
        required: allowedRoles,
        current: userRole,
      });
      return;
    }

    next();
  };
};

export const requireMinRole = (minRole: Role) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const userRoleLevel = roleHierarchy[req.user.role];
    const requiredRoleLevel = roleHierarchy[minRole];

    if (userRoleLevel < requiredRoleLevel) {
      res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
        required: minRole,
        current: req.user.role,
      });
      return;
    }

    next();
  };
};

// Convenience middleware for common role checks
export const adminOnly = requireRole('admin');
export const managerOrAdmin = requireRole('manager', 'admin');
export const anyAuthenticated = requireRole('agent', 'manager', 'admin');
