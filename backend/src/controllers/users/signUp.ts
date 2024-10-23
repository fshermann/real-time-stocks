/**
 * Handles users signing up for the app.
 */

import handleLogin from "./login/login";

export default async function handleSignUp(username: string, hashedPassword: string, User: any) {
    let matchingUser = await User.findOne({
        where: {
            username
        }
    });

    if (matchingUser) {
        return false;
    } else {
        try {
            await User.create({
                username,
                hashedPassword
            });

            const token = await handleLogin(username, hashedPassword, User);
            return token;
        } catch {
            return false;
        }
    }
}