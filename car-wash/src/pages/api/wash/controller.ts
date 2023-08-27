import { Wash } from "../models/wash";
import { prisma } from '../../../libs/prisma';
import { WashCount } from "../models/wash-count";

export async function getActualList(): Promise<Wash[]> {
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

export async function getWashCounters(): Promise<WashCount> {
  const dateFormat = getFormatedDate();
  const daily = await prisma.wash.count({
    where: {
      createdAt: {
        lte: new Date(`${dateFormat} 23:59:59`),
        gte: new Date(`${dateFormat} 00:00:00`)
      }
    }
  });

  const weeklyList = await prisma.wash.findMany({
    where: {
      createdAt: {
        lte: new Date(`${dateFormat} 23:59:59`),
        gte: new Date(`${dateFormat} 00:00:00`)
      }
    },
    select: {
      rate: true
    }
  });
  const weeklyTotal = weeklyList
    .map(item => item.rate)
    .reduce((prev, next) => {
      console.log(prev, next)
      return Number(prev) + Number(next);
    }, 0)
  return {
    dailyCount: daily,
    totalEarningsWeekly: String(weeklyTotal),
    totalEarningsMonth: '',
  }
}

function getFormatedDate(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${String(month).padStart(2, '0')}-${date.getDate()}`;
}