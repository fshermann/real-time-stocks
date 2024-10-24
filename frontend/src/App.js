import {
    Grid2
} from '@mui/material';
import { useState } from 'react';

import StocksTable from './components/StocksTable';
import StockHistory from './components/StockHistory';
import AuthCard from './components/AuthCard';

export default function App() {
    const [pickedStock, setPickedStock] = useState(1);
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);

    return (
        <Grid2
            container
            sx={{
                width: "100%"
            }}
        >
            <Grid2
                size={6}
            >
                <StocksTable
                    setPickedStock={setPickedStock}
                />
            </Grid2>
            <Grid2
                size={3}
            >
                <StockHistory
                    stockId={pickedStock}
                />
            </Grid2>
            <Grid2
                size={3}
            >
                <AuthCard
                    setToken={setToken}
                    token={token}
                    setUserId={setUserId}
                />
            </Grid2>
        </Grid2>
    )
}