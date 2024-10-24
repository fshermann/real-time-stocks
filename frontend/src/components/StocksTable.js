import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Pagination,
    Card,
    Typography,
    Button
} from '@mui/material';

import { useEffect, useState } from 'react';
import { addToWatchList, getStocks } from '../utils/apiCalls';

export default function StocksTable(props) {
    const {
        setPickedStock,
        userId,
        token,
        forceWatchListUpdate,
        setForceWatchListUpdate
    } = props;

    const [stocks, setStocks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const stocksPerPage = 10;

    useEffect(() => {
        getStocks(page, stocksPerPage).then(res => {
            setStocks(res.data);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        });
    }, [page])

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleAddingToWatchList = (stockId) => {
        addToWatchList(userId, stockId, token).then(() => {
            setForceWatchListUpdate(!forceWatchListUpdate);
        }).catch(() => {
            alert('Stock is already on watch list!')
        });
    }

    return (
        <Card
            elevation={4}
            sx={{
                p: 4
            }}
        >
            <Typography
                variant='h5'
            >
                All Stocks
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Ticker</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((item) => (
                        <TableRow
                            key={item.id}
                            onClick={() => setPickedStock(item.id)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'grey',
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.ticker}</TableCell>
                            {
                                userId ?
                                    <TableCell>
                                        <Button
                                            onClick={() => handleAddingToWatchList(item.id)}
                                        >
                                            Add To Watch List
                                        </Button>
                                    </TableCell> : null
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
        </Card >
    )
}