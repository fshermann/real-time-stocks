import { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';
import CryptoJS from 'crypto-js';

import { login, signUp } from '../utils/apiCalls';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export default function AuthCard(props) {
    const {
        token,
        setToken,
        setUserId
    } = props;

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!username || !password) {
                setErrorMessage('Please fill out both fields.');
                return;
            }

            if (isLogin) {
                login(username, hashPassword(password)).then(res => {
                    setToken(res.token);
                    setUserId(res.userId);
                }).catch(() => {
                    setErrorMessage('Login failed. Invalid username or password.');
                });
            } else {
                if (username && password.length >= 4) {
                    signUp(username, hashPassword(password)).then(res => {
                        setToken(res.token);
                        setUserId(res.userId);
                    });
                } else {
                    setErrorMessage('Sign-up failed. Ensure a valid username and a password with at least 4 characters.');
                }
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <Card
            elevation={4}
            sx={{
                maxWidth: 400,
                mx: 'auto',
                p: 3
            }}
        >
            {
                token ?
                    <Typography>
                        Welcome {username}!
                    </Typography> :
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="username"
                                type="username"
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {errorMessage && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {errorMessage}
                                </Typography>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ mt: 2 }}
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </Button>

                            <Button
                                fullWidth
                                variant="text"
                                sx={{ mt: 1 }}
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setErrorMessage('');
                                }}
                            >
                                {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
                            </Button>
                        </Box>
                    </CardContent>
            }
        </Card>
    );
};