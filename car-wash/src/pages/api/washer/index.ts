import { NextApiRequest, NextApiResponse } from "next";
import { GeneralError } from "../models/general-error";
import { prisma } from '../../../libs/prisma';
import { getFormatedActualDate } from "../../../libs/util";
import { Washer } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Washer[] | GeneralError>
) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getWasherList(req);
        return res.status(200).json(result);
      } catch (err) {
        console.log(err)
        return res.json({ message: 'error getting the list' });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}

async function getWasherList(req: NextApiRequest): Promise<Washer[]> {
  const date = getFormatedActualDate();
  const list = await prisma.washer.findMany({
    include: {
      washes: {
        select: {
          rate: true,
        },
        where: {
          createdAt: {
            lte: new Date(`${date} 23:59:59`),
            gte: new Date(`${date} 00:00:00`)
          }
        }
      }
    },
    where: filterWasherList(req)
  })
  return list;
}

function filterWasherList(req: NextApiRequest): any {
  const filters: any = {};
  if (req.query.name) {
    filters['name'] = {
      contains: String(req.query.name)
    }
  }
  if (req.query.documentId) {
    filters['documentId'] = {
      contains: String(req.query.documentId)
    }
  }
  return filters;
}