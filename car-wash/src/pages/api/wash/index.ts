import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../libs/prisma';
import { Wash } from "../models/wash";
import { GeneralError } from "../models/general-error";
import { z } from "zod";
import { PaginatedResponse } from "../models/paginated-response";

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
  res: NextApiResponse<Wash | PaginatedResponse<Wash> | GeneralError>
) {
  switch (req.method) {
    case 'POST':
      try {
        const result = await createWash(req);
        return res.status(200).json(result);
      } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error creating the wash', error });
      }
    case 'GET':
      try {
        const result = await getWashList(req);
        return res.status(200).json(result);
      } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error getting the wash list', error });
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
      washerId: request.washerId
    }
  });
  return washObj;
}

async function getWashList(req: NextApiRequest): Promise<PaginatedResponse<Wash>> {
  const queryParams = req.query;
  const page = Number(queryParams.page) || 1;
  const size = Number(queryParams.size) || 10;
  const list = await prisma.wash.findMany({
    skip: (page - 1) * size,
    take: size,
    include: {
      washer: {
        select: {
          name: true
        }
      }
    },
    where: filterWashList(req),
    orderBy: {
      createdAt: 'desc'
    }
  })
  return {
    page: page,
    size: size,
    total: await prisma.wash.count({ where: filterWashList(req) }),
    data: list
  }
}

function filterWashList(req: NextApiRequest) {
  const filters: any = {};
  if (req.query.washType) {
    filters['washType'] = String(req.query.washType);
  }
  if (req.query.licensePlate) {
    filters['licensePlate'] = {
      contains: String(req.query.licensePlate)
    }
  }
  return filters;
}