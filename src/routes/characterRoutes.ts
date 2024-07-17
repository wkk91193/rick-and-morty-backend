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

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Retrieve a list of characters
 *     description: Retrieve a list of characters from the Rick and Morty API
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort characters by name
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Filter characters by species
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [alive, dead, unknown]
 *         description: Filter characters by status
 *     responses:
 *       200:
 *         description: A list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     next:
 *                       type: integer
 *                     prev:
 *                       type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       status:
 *                         type: string
 *                       species:
 *                         type: string
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Failed to fetch characters
 */
router.get('/characters', validateGetCharacters, getCharacters);
/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Retrieve a character by ID
 *     description: Retrieve a character by its ID from the Rick and Morty API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: A character object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 status:
 *                   type: string
 *                 species:
 *                   type: string
 *       400:
 *         description: Invalid character ID
 *       500:
 *         description: Failed to fetch character
 */
router.get('/characters/:id', validateGetCharacterById, getCharacterById);

export default router;
