import { Request, Response } from 'express';

export const getBattleIndex = async (req: Request, res: Response): Promise<void> => {
    res.render('pages/battle');
};
