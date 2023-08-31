import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralError } from '../models/general-error';
import { WashCount } from '../models/wash-count';
import moment from 'moment';
import { prisma } from '../../../libs/prisma';


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
  const actualDate = getFormatedDate();
  const weeklyDate = getWeeklyDate();
  const monthlyDate = getMonthlyDate();

  console.log(actualDate, weeklyDate, monthlyDate);
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


function getFormatedDate(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${String(month).padStart(2, '0')}-${date.getDate()}`;
}

function getWeeklyDate() {
  const weeklyDate = moment();
  weeklyDate.subtract(7, 'days');
  const month = weeklyDate.month() + 1;
  return `${weeklyDate.year()}-${String(month).padStart(2, '0')}-${weeklyDate.date()}`;
}

function getMonthlyDate() {
  const monthlyDate = moment();
  monthlyDate.subtract(1, 'month');
  const month = monthlyDate.month() + 1;
  return `${monthlyDate.year()}-${String(month).padStart(2, '0')}-${monthlyDate.date()}`;
}