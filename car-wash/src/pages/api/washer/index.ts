import { NextApiRequest, NextApiResponse } from "next";
import { GeneralError } from "../models/general-error";
import { prisma } from '../../../libs/prisma';
import { getFormatedActualDate } from "../../../libs/util";
import { Washer } from "@prisma/client";
import { z } from "zod";

const washerSchema = z.object({
  name: z.string().min(1, 'name es requerido'),
  documentId: z.string().min(1, 'document ID es requerido'),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Washer | Washer[] | GeneralError>
) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getWasherList(req);
        return res.status(200).json(result);
      } catch (err) {
        return res.json({ message: 'error getting the list', error: err });
      }
    case 'POST':
      try {
        const result = await createWasher(req);
        return res.status(201).json(result);
      } catch (error) {
        return res.status(400).json({ message: 'error creating a washer', error });
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
  });

  return list.map(item => {
    const sumOfRates = item.washes.reduce((acc, wash) => acc + Number(wash.rate), 0);
    return {
      ...item,
      washes: item.washes.length,
      earnings: sumOfRates
    }
  });
}

async function createWasher(req: NextApiRequest): Promise<Washer> {
  const request = washerSchema.parse(req.body);
  const washerObj = await prisma.washer.create({
    data: {
      name: request.name,
      documentId: request.documentId
    }
  });
  return washerObj;
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