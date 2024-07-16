// src/middleware/validationMiddleware.ts

import { query, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';

const validStatuses = ['Alive', 'Dead', 'unknown'];

export const validateGetCharacters = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('sort')
    .optional()
    .isIn(['name', '-name'])
    .withMessage('Sort must be either "name" or "-name"'),
  query('species')
    .optional()
    .isString()
    .withMessage('Species must be a string'),
  query('status')
    .optional()
    .isIn(validStatuses)
    .withMessage(`Status must be one of ${validStatuses.join(', ')}`),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn({ errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetCharacterById = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
