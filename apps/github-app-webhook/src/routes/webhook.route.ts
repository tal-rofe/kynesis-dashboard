import { Router } from 'express';

import { trackRepositoryStar } from '../controllers/webhook.controller';

const router = Router();

router.post('/webhook', trackRepositoryStar);

export default router;
