import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralError } from '../models/general-error';
import { WashCount } from '../models/wash-count';
import { getWashCounters } from './controller';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WashCount | GeneralError>
) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getWashCounters();
        return res.status(200).json(result);
      } catch (err) {
        console.log(err)
        return res.json({ message: 'error calculating the counters' });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}


