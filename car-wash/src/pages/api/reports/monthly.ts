import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getFormatedActualDate } from "../../../libs/util";
import { prisma } from '../../../libs/prisma';
import { GeneralError } from "../models/general-error";
import { MonthlyReport } from "../models/wash-report";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MonthlyReport[] | GeneralError>
) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getReport();
        return res.status(200).json(result);
      } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'error getting the list', error: err });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}

async function getReport(): Promise<MonthlyReport[]> {
  const weeks = calculateWeeks();
  const list = [];
  for (let week of weeks) {
    const rates = await prisma.wash.findMany({
      select: {
        rate: true,
        createdAt: true
      },
      where: {
        createdAt: {
          lte: new Date(`${week.end} 23:59:59`),
          gte: new Date(`${week.start} 00:00:00`)
        }
      }
    });
    const total = rates
      .map(item => item.rate)
      .reduce((prev, next) => {
        return Number(prev) + Number(next)
      }, 0)
    list.push({
      week: `${week.start} - ${week.end}`,
      washerCount: rates.length,
      total
    });
  }
  return list;
}

function calculateWeeks() {
  const date = moment(getFormatedActualDate(), 'YYYY-MM-DD');
  const year = date.year();
  const month = date.month();

  // Create a Moment.js object for the first day of the desired month
  const firstDayOfMonth = moment([year, month, 1]);

  // Calculate the last day of the desired month
  const lastDayOfMonth = firstDayOfMonth.clone().endOf('month');

  // Initialize the current week to the first week of the month
  let currentWeek = firstDayOfMonth.clone().startOf('week');


  const weeks = [];

  // Loop through the weeks of the desired month
  while (currentWeek.isSameOrBefore(lastDayOfMonth)) {
    const startOfWeek = currentWeek.clone();
    const endOfWeek = currentWeek.clone().endOf('week');

    weeks.push(
      {
        start: startOfWeek.format('YYYY-MM-DD'),
        end: endOfWeek.format('YYYY-MM-DD')
      }
    );

    // Move to the next week
    currentWeek.add(1, 'week');
  }
  return weeks;
}