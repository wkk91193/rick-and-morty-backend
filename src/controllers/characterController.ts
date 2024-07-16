// src/controllers/characterController.ts

import { Request, Response } from 'express';
import { getCharacters, getCharacterById } from '../services/characterService';

export const getCharactersController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 20;
    const sort = (req.query.sort as string) || '';

    const characters = await getCharacters(page, pageSize, sort);
    res.status(200).json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCharacterByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const character = await getCharacterById(id);
    res.status(200).json(character);
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
