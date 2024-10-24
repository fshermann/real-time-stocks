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

import { useEffect, useState } from 'react';
import { getStockPriceById } from '../utils/apiCalls';

export default function StockHistory(props) {
    const {
        stockId
    } = props;

    const [stockPrices, setStockPrices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const stocksPerPage = 10;

    useEffect(() => {
        getStockPriceById(stockId, page, stocksPerPage).then(res => {
            setStockPrices(res.data);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        });
    }, [stockId, page])

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
                Stock Price History
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stockPrices.map((item) => (
                        <TableRow
                            key={item.id}
                        >
                            <TableCell>{item.price}</TableCell>
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