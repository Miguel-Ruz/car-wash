import type { NextApiRequest, NextApiResponse } from 'next'
import { Wash } from '../models/wash';
import { GeneralError } from '../models/general-error';
import { getActualList } from './controller';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Wash[] | GeneralError>
) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getActualList();
        return res.status(200).json(result);
      } catch (err) {
        return res.json({ message: 'error getting the list' });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}