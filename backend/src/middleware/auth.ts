import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export default function verifyToken(req: any, res: any, next: any) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Store user info in the request object for further use
        req.user = decoded;
        next();
    });
}