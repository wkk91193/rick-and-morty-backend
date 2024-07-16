import { Request, Response } from 'express';
import { getCharacters, getCharacterById } from '../services/characterService';

export const getCharactersController = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 20 } = req.query;
  try {
    const characters = await getCharacters(Number(page), Number(pageSize));
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
};

export const getCharacterByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const character = await getCharacterById(id);
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch character' });
  }
};
