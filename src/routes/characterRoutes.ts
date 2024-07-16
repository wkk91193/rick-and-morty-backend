import { Router } from 'express';
import {
  getCharactersController,
  getCharacterByIdController,
} from '../controllers/characterController';

const router = Router();

router.get('/characters', getCharactersController);
router.get('/characters/:id', getCharacterByIdController);

export default router;
