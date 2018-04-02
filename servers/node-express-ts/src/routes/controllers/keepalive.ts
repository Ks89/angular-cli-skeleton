import { Request, Response } from 'express';

import { logger } from '../../logger';

export function keepAlive(req: Request, res: Response) {
  logger.debug('REST keepAlive');

  res.json({ message: 'Express is up!' });
}
