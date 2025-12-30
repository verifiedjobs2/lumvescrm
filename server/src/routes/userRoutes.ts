import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
  createUserValidation,
  updateUserValidation,
  resetPasswordValidation,
} from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { adminOnly, managerOrAdmin } from '../middleware/roleCheck';
import { validate } from '../middleware/validate';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Manager or Admin can view users
router.get('/', managerOrAdmin, getUsers);
router.get('/:id', managerOrAdmin, getUserById);

// Only Admin can create, update, delete users
router.post('/', adminOnly, validate(createUserValidation), createUser);
router.put('/:id', adminOnly, validate(updateUserValidation), updateUser);
router.delete('/:id', adminOnly, deleteUser);
router.post(
  '/:id/reset-password',
  adminOnly,
  validate(resetPasswordValidation),
  resetUserPassword
);

export default router;
