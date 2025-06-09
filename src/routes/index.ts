import { Router } from 'express';
import { getIndex } from '../controllers/indexController.js';
import { getBattleIndex } from '../controllers/battleController.js';
const router: Router = Router();

router.get('/', getIndex);
router.get('/battle', getBattleIndex);


export default router;
