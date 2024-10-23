import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export default function verifyToken(req: any, res: any, next: any) {
    // remove Bearer from the header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
        console.log(err)
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    });
}