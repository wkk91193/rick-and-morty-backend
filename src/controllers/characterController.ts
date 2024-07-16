// src/controllers/characterController.ts

import { Request, Response } from 'express';
import { getCharacters, getCharacterById } from '../services/characterService';
import logger from '../../logger';

export const getCharactersController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const sort = (req.query.sort as string) || '';
    const species = (req.query.species as string) || '';
    const status = (req.query.status as string) || '';

    const characters = await getCharacters(page, sort, species, status);
    res.status(200).json(characters);
  } catch (error) {
    logger.error(`Error listing characters: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCharacterByIdController = async (
  req: Request,
  res: Response
) => {
   const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    res.status(200).json(character);
  } catch (error) {
    logger.error(`Error fetching character with ID ${id}: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
