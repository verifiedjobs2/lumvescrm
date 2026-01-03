import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as aiController from '../controllers/aiController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Chat with AI assistant
router.post('/chat', aiController.chat);

// Get insight for specific lead
router.get('/lead/:id/insight', aiController.getLeadInsight);

// Get dashboard AI insights
router.get('/dashboard', aiController.getDashboardInsights);

// Bulk analyze all leads
router.get('/analyze', aiController.analyzeLeads);

export default router;
