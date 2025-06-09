import { Request, Response } from 'express';
import { FactResponse } from '../utils/interfaces.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getData } from '../utils/ajax.js';

const apiUrl: string = process.env.API_URL;

export const getIndex = async (req: Request, res: Response): Promise<void> => {
  const fact: FactResponse = await getData(`${apiUrl}/api/v2/facts/random`);
  res.render('pages/index', { fact: fact });
};
