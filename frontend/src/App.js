import {
    Grid2,
    Stack
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
                size={5}
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
                size={4}
            >
                <Stack
                    direction="column"
                >
                    <AuthCard
                        setToken={setToken}
                        token={token}
                        setUserId={setUserId}
                    />
                    {
                        token ?
                            <WatchList
                                token={token}
                                userId={userId}
                                setPickedStock={setPickedStock}
                                forceWatchListUpdate={forceWatchListUpdate}
                            /> : null
                    }
                </Stack>

            </Grid2>


        </Grid2>
    )
}