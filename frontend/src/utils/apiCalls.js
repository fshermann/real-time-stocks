/**
 * The purpose of this file is to serve as a main place to define all the backend API calls.
 */

import axios from 'axios';

const root = 'http://localhost:5000'

export async function login(username, hashedPassword) {
    const res = await axios.post(root + '/api/v1/users/login', {
        username,
        hashedPassword
    });
    return res.data;
}

export async function signUp(username, hashedPassword) {
    const res = await axios.post(root + '/api/v1/users', {
        username,
        hashedPassword
    });
    return res.data;
}

export async function getStocks(page, recordsPerPage) {
    const res = await axios.get(root + '/api/v1/stocks', {
        params: {
            page,
            size: recordsPerPage
        }
    });
    return res.data;
}

export async function getStockById(stockId) {
    const res = await axios.get(root + `/api/v1/stocks/${stockId}`);
    return res.data;
}

export async function getStockPriceById(stockId, page, recordsPerPage) {
    const res = await axios.get(root + `/api/v1/stocks/${stockId}/price`, {
        params: {
            page,
            size: recordsPerPage
        }
    });
    return res.data;
}

export async function addToWatchList(userId, stockId, token) {
    const res = await axios.post(root + `/api/v1/users/${userId}/watchlist/${stockId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export async function deleteFromWatchList(userId, stockId, token) {
    const res = await axios.delete(root + `/api/v1/users/${userId}/watchlist/${stockId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export async function getWatchList(userId, token, page, recordsPerPage) {
    const res = await axios.get(root + `/api/v1/users/${userId}/watchlist`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            page,
            size: recordsPerPage
        }
    });
    return res.data;
}