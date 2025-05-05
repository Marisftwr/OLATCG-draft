import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgLoader from "./OlatcgLoader";
import OlatcgSnackbar from "./OlatcgSnackbar";

const OlatcgAlignmentTable = ({idAnalysis}) => {
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const formatAlignedResponse = (algnStr) => {
        if (algnStr == '[]'){
            return ' --- ';
        }

        let formatStr = algnStr.replace(/\n\n/, '/').replace(/\n/g,',').replace(/[\[\]]+/g, '').replace(/\s{2,}/g, " ").replace(/(\d+)\s/g, "$1 - ");

        return formatStr
    }

    const onSuccessGetAlignmentByIdAnalysis = (obj) => {
        setColumns([{
            id: 'alignmentA',
            label: getMessage('olatcgHomologyTable.label.alignmentA')
        },
        {
            id: 'alignmentB',
            label: getMessage('olatcgHomologyTable.label.alignmentB')
        },
        {
            id: 'type',
            label: getMessage('olatcgAlignmentTable.label.type')
        },
        {
            id: 'status',
            label: getMessage('olatcgAlignmentTable.label.status')
        }
    ]);

        setRows([
                {alignmentA: obj.data.alignments[0].biological_sequences[0].bases.toUpperCase(),//aln.target.toUpperCase(),
                alignmentB: obj.data.alignments[0].biological_sequences[1].bases.toUpperCase(),//aln.query.toUpperCase(),
                type: obj.data.type,
                status: obj.data.status,
            }
        ]);
        showLoader(false);
    }

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onFailureGetAlignmentByIdAnalysis = (error) => {
        setMsgSnackbar(error.errorDescription);
        showSnackbar(error.errorDescription, 'error');
        showLoader(true);
        setTimeout(() => {
            document.location.reload();
            showLoader(false);
        }, 5000);
    }

    useEffect(() => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_ID;
        url = url.replace('{id}', idAnalysis);
        makeRequest(url, 'GET', null, onSuccessGetAlignmentByIdAnalysis, onFailureGetAlignmentByIdAnalysis);
    }, [idAnalysis]);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
            <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', p: 1, color: 'primary.contrastText'}}>
                {getMessage('alignment.followAnalysis.preview', idAnalysis)}
            </Typography>
            <TableContainer sx={{ maxHeight: 360 }}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                    sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align="center" sx={{wordWrap: 'break-word', maxWidth: 150, verticalAlign: 'top'}}>
                                        {value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
        />
        <OlatcgLoader show={isLoading}/>
    </>
}

export default OlatcgAlignmentTable;