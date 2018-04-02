import { Request, Response } from 'express';

import { logger } from '../../logger';

export function secret(req: Request, res: Response) {
  logger.debug('REST secret');
  res.json({ message: 'This is a secret message from an authenticated rest API' });
}
