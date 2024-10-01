import { PrismaClient, WashType } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { GeneralError } from '../models/general-error';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WashType | WashType[] | GeneralError>
) {
  const id = req.query.id as string;

  switch (req.method) {
    case 'GET':
      try {
        if (id) {
          // Get a single WashType by ID
          const washType = await prisma.washType.findUnique({
            where: { id: id },
          });
          if (!washType) return res.status(404).json({ message: 'Not Found' });
          return res.status(200).json(washType);
        } else {
          // Get all WashTypes
          const washTypes = await prisma.washType.findMany();
          return res.status(200).json(washTypes);
        }
      } catch (error) {
        return res.status(500).json({ message: 'error loading the list', error });
      }

    case 'POST':
      try {
        const { name, value } = req.body;
        const newWashType = await prisma.washType.create({
          data: {
            name,
            value,
          },
        });
        return res.status(201).json(newWashType);
      } catch (error) {
        return res.status(500).json({ message: 'error creation the washtype', error });
      }

    case 'PUT':
      try {
        const { name, value } = req.body;
        const updatedWashType = await prisma.washType.update({
          where: { id: id },
          data: { name, value },
        });
        return res.status(200).json(updatedWashType);
      } catch (error) {
        return res.status(500).json({ message: 'error updating the washtype', error });
      }

    case 'DELETE':
      try {
        await prisma.washType.delete({
          where: { id: id },
        });
        return res.status(204).end();  // No Content
      } catch (error) {
        return res.status(500).json({ message: 'error removing the washtype', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}