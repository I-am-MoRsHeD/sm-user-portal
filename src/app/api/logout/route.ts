import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default function POST(req: NextApiRequest, res: NextApiResponse) {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
}