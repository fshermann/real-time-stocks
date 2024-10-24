import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Pagination,
    Card,
    Typography
} from '@mui/material';

import { useCallback, useEffect, useState } from 'react';
import { getStockById, getStockPriceById } from '../utils/apiCalls';

export default function StockHistory(props) {
    const {
        stockId
    } = props;

    const [stockPrices, setStockPrices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [name, setName] = useState('');

    const refreshInterval = 5000;
    const stocksPerPage = 10;

    const refreshData = useCallback(() => {
        getStockPriceById(stockId, page, stocksPerPage).then(res => {
            setStockPrices(res.data);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        });

        getStockById(stockId).then(res => {
            setName(res.data.name);
        });
    }, [page, stockId]);

    useEffect(() => {
        refreshData();

        // setup polling
        const intervalId = setInterval(refreshData, refreshInterval);

        // clear interval when unmount happens
        return () => clearInterval(intervalId);
    }, [stockId, page, refreshData])

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
                Stock Price History for {name}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stockPrices.map((item) => (
                        <TableRow
                            key={item.id}
                        >
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
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
        </Card>
    )
}