import { Router } from 'express';
import {
  login,
  loginValidation,
  me,
  logout,
  changePassword,
  changePasswordValidation,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.post('/login', validate(loginValidation), login);

// Protected routes
router.get('/me', authenticate, me);
router.post('/logout', authenticate, logout);
router.post(
  '/change-password',
  authenticate,
  validate(changePasswordValidation),
  changePassword
);

export default router;
