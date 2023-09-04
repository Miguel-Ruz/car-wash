import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralError } from '../models/general-error';
import { WashCount } from '../models/wash-count';
import moment from 'moment';
import { prisma } from '../../../libs/prisma';
import { getFormatedActualDate, getMonthlyDate, getWeeklyDate } from '../../../libs/util';


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
        return res.json({ message: 'error calculating the counters' });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}


async function getWashCounters(): Promise<WashCount> {
  const actualDate = getFormatedActualDate();
  const weeklyDate = getWeeklyDate();
  const monthlyDate = getMonthlyDate();

  const dailyPromise = prisma.wash.count({
    where: {
      createdAt: {
        lte: new Date(`${actualDate} 23:59:59`),
        gte: new Date(`${actualDate} 00:00:00`)
      }
    }
  });

  const weeklyPromise = prisma.wash.findMany({
    where: {
      createdAt: {
        lte: new Date(`${actualDate} 23:59:59`),
        gte: new Date(`${weeklyDate} 00:00:00`)
      }
    },
    select: {
      rate: true
    }
  });

  const monthlyPromise = prisma.wash.findMany({
    where: {
      createdAt: {
        lte: new Date(`${actualDate} 23:59:59`),
        gte: new Date(`${monthlyDate} 00:00:00`)
      }
    },
    select: {
      rate: true
    }
  });

  const [daily, weeklyList, monthlyList] = await Promise.all([dailyPromise, weeklyPromise, monthlyPromise]);


  return {
    dailyCount: daily,
    totalEarningsWeekly: getTotalRate(weeklyList),
    totalEarningsMonth: getTotalRate(monthlyList),
  }
}

function getTotalRate(list: { rate: string }[]): string {
  const totalRate = list.map(item => item.rate)
    .reduce((prev, next) => {
      return Number(prev) + Number(next);
    }, 0)
  return String(totalRate);
}


