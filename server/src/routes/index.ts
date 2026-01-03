import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import aiRoutes from './aiRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/ai', aiRoutes);

// Placeholder routes for future implementation
router.use('/customers', (req, res) => {
  res.status(501).json({ message: 'Customers API coming in Phase 2' });
});

router.use('/products', (req, res) => {
  res.status(501).json({ message: 'Products API coming in Phase 3' });
});

router.use('/calls', (req, res) => {
  res.status(501).json({ message: 'Calls API coming in Phase 2' });
});

router.use('/leads', (req, res) => {
  res.status(501).json({ message: 'Leads API coming in Phase 2' });
});

router.use('/orders', (req, res) => {
  res.status(501).json({ message: 'Orders API coming in Phase 3' });
});

router.use('/followups', (req, res) => {
  res.status(501).json({ message: 'Follow-ups API coming in Phase 4' });
});

router.use('/reports', (req, res) => {
  res.status(501).json({ message: 'Reports API coming in Phase 4' });
});

export default router;
