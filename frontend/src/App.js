import {
    Grid2
} from '@mui/material';
import { useState } from 'react';

import StocksTable from './components/StocksTable';
import StockHistory from './components/StockHistory';
import AuthCard from './components/AuthCard';
import WatchList from './components/WatchList';

export default function App() {
    const [pickedStock, setPickedStock] = useState(1);
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [forceWatchListUpdate, setForceWatchListUpdate] = useState(false);

    return (
        <Grid2
            spacing={1}
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
                    userId={userId}
                    token={token}
                    setForceWatchListUpdate={setForceWatchListUpdate}
                    forceWatchListUpdate={forceWatchListUpdate}
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

            {
                token ?
                    <Grid2
                        size={12}
                    >
                        <WatchList
                            token={token}
                            userId={userId}
                            setPickedStock={setPickedStock}
                            forceWatchListUpdate={forceWatchListUpdate}
                        />
                    </Grid2> : null
            }
        </Grid2>
    )
}