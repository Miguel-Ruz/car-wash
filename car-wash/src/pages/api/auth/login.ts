import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function loginHandler(  req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
      
            res.status(200).json( {message: "hola"} )
        default: 
            res.status(404).json( {message: 'Invalid method'})

    }
}
