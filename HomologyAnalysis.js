import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgNodata from "../components/OlatcgNoData";

const HomologyAnalysis = () => {

    const location = useLocation();
    const navigateTo = useNavigate();
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [info, setInfo] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const analysisActionButton = (status, id) =>{
        if (status == 'EXECUTION_SUCCEEDED'){
            return <Button onClick={() => navigateTo(location.pathname + '/' + id)}>
                        {getMessage('common.label.details')}
                    </Button>
        } else if (status == 'WAITING_FOR_EXECUTION' || status == 'IN_EXECUTION'){
            return <Button disabled>
                        {getMessage('common.label.wait')}
                    </Button>
        } else {
            return <Button sx={{color:'error.main'}} disabled>
                        {getMessage('common.label.unavailable')}
                    </Button>
        }
    }

    const colorStatus = (status) =>{
        if (status == 'EXECUTION_SUCCEEDED'){
            return 'success.main'
        } else if (status == 'IN_EXECUTION'){
            return 'warning.main'
        } else if (status == 'WAITING_FOR_EXECUTION') {
            return '#000000'
        } else {
            return 'error.main'
        }
    }

    const backgroundColorStatus = (status) =>{
        if (status == 'EXECUTION_SUCCEEDED'){
            return 'success.light'
        } else if (status == 'IN_EXECUTION'){
            return 'warning.light'
        } else if (status == 'WAITING_FOR_EXECUTION') {
            return 'primary.light'
        } else {
            return 'error.light'
        }
    }

    const onSuccessGetAnalysis = (obj) => {
        if (obj.data.length === 0){
            setInfo(true)
        } 

        setColumns([{id: 'id', label: getMessage('alignmentAnalysis.label.id')},
                    {id: 'title', label: getMessage('alignmentAnalysis.label.title')},
                    {id: 'description', label: getMessage('alignmentAnalysisDetails.label.description')},
                    {id: 'type', label: getMessage('alignmentAnalysis.label.type')},
                    {id: 'status', label: getMessage('alignmentAnalysis.label.status')},
                    {id: 'action', label: getMessage('alignmentAnalysis.label.action')}]);

        setRows(obj.data.map((homAnalysis, index) => {
            return {
                code: index,
                id: homAnalysis.id,
                title: homAnalysis.title,
                description: homAnalysis.description,
                type: homAnalysis.type,
                status: homAnalysis.status,
                action: analysisActionButton(homAnalysis.status, homAnalysis.id)
            };
        }));
        setTotalPages(Math.ceil(obj.meta.total_pages/15));
        showLoader(false);
    }

    const onFailureGetAlignmentAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const onComponentMount = () => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_TYPE;
        url = url.replace('{analysis_type}', 'HOMOLOGY') + '&ordering=-id';

        makeRequest(url, 'GET', null, onSuccessGetAnalysis, onFailureGetAlignmentAnalysis);
    }

    const handlePaginationChange = (e, page) => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_TYPE;
        url = url.replace('{analysis_type}', 'HOMOLOGY') + '&ordering=-id' + '&page=' + (page);

        makeRequest(url, 'GET', null, onSuccessGetAnalysis, onFailureGetAlignmentAnalysis);
    }

    useEffect(() => {
        onComponentMount();
    }, []);
    
   

    if(location.pathname === '/analysis/homology'){
        return <>
            <Box sx={{px: 4, pb: 8}}>{info ? <OlatcgNodata />: 
                <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                    <TableContainer sx={{ maxHeight: '60vh' }}>
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
                                        if (column.id == 'status'){
                                            return (
                                                <TableCell 
                                                    key={column.id} 
                                                    align="center" 
                                                    sx={{ 
                                                            maxWidth: 150, 
                                                            verticalAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: colorStatus(value),
                                                            backgroundColor: backgroundColorStatus(value),
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                            >
                                                {value}
                                            </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell 
                                                    key={column.id} 
                                                    align="center" 
                                                    sx={{ 
                                                            maxWidth: 150, 
                                                            verticalAlign: 'center',
                                                            backgroundColor: backgroundColorStatus(row['status']),
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination 
                        count={totalPages} 
                        color="primary" 
                        onChange={handlePaginationChange}
                    />
                </Box>
            </Box>
            <OlatcgSnackbar
                isOpened={isSnackbarOpened} 
                onClose={() => openSnackbar(false)}
                status={statusSnackbar}
                msg={msgSnackbar} 
            />
            <OlatcgLoader show={isLoading}/>
        </>
    }

    return <Outlet />
};

export { HomologyAnalysis };