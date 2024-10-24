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
} from "@mui/material";
import { deleteFromWatchList, getWatchList } from "../utils/apiCalls";
import { useCallback, useEffect, useState } from "react";

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

    const getData = useCallback(() => {
        getWatchList(userId, token, page, stocksPerPage).then(res => {
            setWatchList(res.data);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        });
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = async (item) => {
        await deleteFromWatchList(userId, item.stockId, token);
        getData();
    }

    useEffect(() => {
        getData();
    }, [getData, userId, token, page]);

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
                            <TableCell>{item.Stock.name}</TableCell>
                            <TableCell>{item.Stock.ticker}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDelete(item)}
                                >
                                    Remove From Watch List
                                </Button>
                            </TableCell>
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