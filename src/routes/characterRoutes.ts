// src/routes/characterRoutes.ts

import { Router } from 'express';
import {
  getCharacters,
  getCharacterById,
} from '../controllers/characterController';
import {
  validateGetCharacters,
  validateGetCharacterById,
} from '../validation/validationMiddleware';

const router = Router();

router.get('/characters', validateGetCharacters, getCharacters);
router.get('/characters/:id', validateGetCharacterById, getCharacterById);

export default router;
