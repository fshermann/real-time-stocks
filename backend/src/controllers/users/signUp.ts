/**
 * Handles users signing up for the app.
 */

import handleLogin from "./login";

/**
 * This will handle new sign ups and return a valid JWT.
 * If the user already exists, it simply returns the JWT.
 * 
 * @param username - provided username 
 * @param hashedPassword - provided hashed password
 * @param User - the user data model
 * @returns JWT
 */
export default async function handleSignUp(username: string, hashedPassword: string, User: any) {
    try {
        await User.findOrCreate({
            where: { username },
            defaults: { hashedPassword }
        });

        const token = await handleLogin(username, hashedPassword, User);
        return token;
    } catch {
        return false;
    }
}