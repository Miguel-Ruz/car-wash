import { NextApiRequest, NextApiResponse } from "next";
import { GeneralError } from "../models/general-error";
import { prisma } from '../../../libs/prisma';
import { getFormatedActualDate, getWeeklyDate } from "../../../libs/util";
import { Washer } from "@prisma/client";
import { z } from "zod";

const washerSchema = z.object({
  name: z.string().min(1, 'name es requerido'),
  documentId: z.string().min(1, 'document ID es requerido'),
  address: z.string().min(1, 'Address es requerido'),
  exp_id_date: z.string().min(1, 'Fecha de expiracion es requerido'),
  phone_number: z.string().min(1, 'Phone number es requerido'),
  city: z.string().min(1, 'City es requerido'),
  department: z.string().min(1, 'Department es requerido')
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
    case 'DELETE':
      try {
        const result = await removeWasher(req);
        if (result) {
          return res.status(200).json({ message: 'washer removed' });
        } else {
          return res.status(400).json({ message: 'id is required' });
        }
      } catch (error) {
        return res.status(400).json({ message: 'error removing a washer', error });
      }
    case 'PATCH':
      try {
        const result = await patchWasher(req);
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(400).json({ message: 'id is required' });
        }
      } catch (error) {
        return res.status(400).json({ message: 'error removing a washer', error });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}

async function getWasherList(req: NextApiRequest): Promise<Washer[]> {
  const reportType = req.query.type as string;
  let createdAt = null;
  const date = getFormatedActualDate();
  if (reportType === 'weekly') {
    createdAt = {
      lte: new Date(`${date} 23:59:59`),
      gte: new Date(`${date} 00:00:00`)
    }
  } else {
    const weeklyDate = getWeeklyDate();
    createdAt = {
      lte: new Date(`${weeklyDate.end} 23:59:59`),
      gte: new Date(`${weeklyDate.start} 00:00:00`)
    };
  }
  const list = await prisma.washer.findMany({
    include: {
      washes: {
        select: {
          rate: true,
        },
        where: {
          createdAt,
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
    data: request
  });
  return washerObj;
}

async function removeWasher(req: NextApiRequest): Promise<Washer | null> {
  const id = String(req.query.id);
  if (!id) return null;
  const washerObj = await prisma.washer.update({
    where: {
      id
    },
    data: { status: false }
  });
  return washerObj;
}

async function patchWasher(req: NextApiRequest): Promise<Washer | null> {
  const id = String(req.query.id);
  if (!id) return null;
  const washerObj = await prisma.washer.update({
    where: {
      id
    },
    data: req.body
  });
  return washerObj;
}

function filterWasherList(req: NextApiRequest): any {
  const filters: any = {
    status: true
  };
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