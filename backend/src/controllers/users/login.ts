/**
 * Handles users logging into the app.
 * Note: This is not production ready security.
 */
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export default async function handleLogin(username: string, hashedPassword: string, User: any) {
    let matchingUser = await User.findOne({
        where: {
            username
        }
    });

    if (matchingUser && matchingUser.hashedPassword === hashedPassword) {
        // Create a token with the user ID and any other necessary info
        const token = jwt.sign({ id: matchingUser.id, username: matchingUser.username }, SECRET_KEY, { expiresIn: '1h' });
        return { token, userId: matchingUser.id };
    }

    return false;
}