import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


type IRoles = {
  id: bigint,
  rol: string
}[]

export default async function rolesHandler(  req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            const roles:IRoles = await prisma.roles.findMany()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Unreachable code error
            BigInt.prototype.toJSON = function (): number {
              return Number(this);
            };
            res.status(200).json( {roles: roles} )
        default: 
            res.status(404).json( {message: 'Invalid method'})

    }
}
