import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Pagination,
    Card,
    Typography
} from "@mui/material";
import { getWatchList } from "../utils/apiCalls";
import { useEffect, useState } from "react";

export default function WatchList(props) {
    const {
        token,
        userId,
        setPickedStock
    } = props;

    const [watchList, setWatchList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const stocksPerPage = 10;

    useEffect(() => {
        getWatchList(userId, token, page, stocksPerPage).then(res => {
            setWatchList(res.data);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        });
    }, [userId, token, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Card
            elevation={4}
            sx={{
                mt: 1,
                p: 4
            }}
        >
            <Typography>
                Your Watch List!
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Ticker</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {watchList.map((item) => (
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
    );
}