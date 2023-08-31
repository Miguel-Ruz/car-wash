import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../libs/prisma';
import { Wash } from "../models/wash";
import { GeneralError } from "../models/general-error";
import { z } from "zod";

const washSchema = z.object({
  clientName: z.string().min(1, 'clientName es requerido'),
  vehicleType: z.string().min(1, 'vehicleType es requerido'),
  licensePlate: z.string().min(1, 'licensePlate es requerido'),
  washType: z.string().min(1, 'washType es requerido'),
  rate: z.string().min(1, 'rate es requerido'),
  paymentType: z.string().min(1, 'paymentType es requerido'),
  washerId: z.string().min(1, 'washerId es requerido'),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Wash | Wash[] | GeneralError>
) {
  switch (req.method) {
    case 'POST':
      try {
        const result = await createWash(req);
        return res.status(200).json(result);
      } catch (error) {
        console.log(error)
        return res.json({ message: 'error creating the wash', error });
      }
    case 'GET':
      try {
        const result = await getWashList();
        return res.status(200).json(result);
      } catch (error) {
        return res.json({ message: 'error getting the wash list', error });
      }
    default:
      return res.status(404).json({ message: 'Invalid method' })
  }
}

async function createWash(req: NextApiRequest): Promise<Wash> {

  const request = washSchema.parse(req.body)

  const washObj = await prisma.wash.create({
    data: {
      clientName: request.clientName,
      vehicleType: request.vehicleType,
      licensePlate: request.licensePlate,
      washType: request.washType,
      rate: request.rate,
      paymentType: request.paymentType,
      washers: {
        create: [
          {
            washerId: request.washerId
          }
        ]
      }
    }
  });
  return washObj;
}

async function getWashList() {
  const list = await prisma.wash.findMany({
    include: {
      washers: {
        select: {
          washer: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return list;
}