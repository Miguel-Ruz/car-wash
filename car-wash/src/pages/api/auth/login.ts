import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../libs/prisma';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'POST':
            try {
                const result = await logIn(req);
                return res.status(200).json(result);
            } catch (err) {
                console.log(err);
                return res.status(400).json({ message: 'user not found' });
            }
        default:
            return res.status(404).json({ message: 'Invalid method' })

    }
}

async function logIn(req: NextApiRequest) {
    const userType = req.body.userType;
    const password = req.body.password;

    const result = await prisma.user.findFirst({
        where: {
            password
        }
    });

    return result;
}