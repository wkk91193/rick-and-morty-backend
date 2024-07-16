// src/routes/characterRoutes.ts

import { Router } from 'express';
import {
  getCharactersController,
  getCharacterByIdController,
} from '../controllers/characterController';
import {
  validateGetCharacters,
  validateGetCharacterById,
} from '../validation/validationMiddleware';

const router = Router();

router.get('/characters', validateGetCharacters, getCharactersController);
router.get(
  '/characters/:id',
  validateGetCharacterById,
  getCharacterByIdController
);

export default router;
