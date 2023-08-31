import type { NextApiRequest, NextApiResponse } from 'next'
import { Wash } from '../models/wash';
import { GeneralError } from '../models/general-error';
import { prisma } from '../../../libs/prisma';


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

async function getActualList(): Promise<Wash[]> {
  const dateFormat = getFormatedDate();
  const list = await prisma.wash.findMany({
    where: {
      createdAt: {
        lte: new Date(`${dateFormat} 23:59:59`),
        gte: new Date(`${dateFormat} 00:00:00`)
      }
    }
  });
  return list;
}

function getFormatedDate(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${String(month).padStart(2, '0')}-${date.getDate()}`;
}