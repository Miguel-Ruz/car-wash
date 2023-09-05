import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralError } from '../models/general-error';
import { prisma } from '../../../libs/prisma';
import { getFormatedActualDate, getMonthlyDate, getWeeklyDate } from '../../../libs/util';
import { WashReport } from '../models/wash-report';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WashReport | GeneralError>
) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getReport(req);
        return res.status(200).json(result);
      } catch (err) {
        return res.status(400).json({ message: 'error getting the list' });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}

async function getReport(req: NextApiRequest): Promise<WashReport> {
  let filters = {};
  const actualDate = getFormatedActualDate();
  switch (req.query.format) {
    case 'daily':
      filters = {
        lte: new Date(`${actualDate} 23:59:59`),
        gte: new Date(`${actualDate} 00:00:00`)
      };
      break;
    case 'weekly':
      const weeklyDate = getWeeklyDate();
      filters = {
        lte: new Date(`${weeklyDate.end} 23:59:59`),
        gte: new Date(`${weeklyDate.start} 00:00:00`)
      };
      break;
    case 'monthly':
      const monthly = getMonthlyDate();
      filters = {
        lte: new Date(`${monthly.end} 23:59:59`),
        gte: new Date(`${monthly.start} 00:00:00`)
      };
      break;
    default:
      filters = {
        lte: new Date(`${actualDate} 23:59:59`),
        gte: new Date(`${actualDate} 00:00:00`)
      };
  }
  const list = await prisma.wash.findMany({
    where: {
      createdAt: filters
    },
    select: {
      clientName: true,
      vehicleType: true,
      washType: true,
      rate: true,
      createdAt: true
    }
  });
  const total = list
    .map(item => item.rate)
    .reduce((prev, next) => {
      return Number(prev) + Number(next)
    }, 0)
  return {
    data: list,
    totalRate: total
  }
}