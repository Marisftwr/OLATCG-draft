import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";


const TableHeadCell = ({ index, color, value='', cellSize=1 }) => (<TableCell
    key={index}
    align={'center'}
    sx={{ 
        bgcolor: color,
        color: 'primary.contrastText'
     }}
    colSpan={cellSize}
>

{value}
</TableCell>);

const TableBodyCell = ({ index, color, value, fontColor='black' }) => (<TableCell
    key={index}
    align="center"
    sx={{
        maxWidth: 150,
        verticalAlign: 'center',
        bgcolor: color,
        color: fontColor
    }}
>
    {value}
</TableCell>);

const TableDetailsBodyCell = ({color, value, cellSize=1, fontColor='black'}) => (<TableCell
    align="center"
    sx={{
        width:'25%',
        verticalAlign: 'center',
        bgcolor: color,
    }}
    colSpan={cellSize}
>
    <Box sx={{
        display: 'block',
        maxHeight:'12vh',
        overflowY:'auto',
        color: fontColor,
        lineBreak: 'anywhere',
        whiteSpace: 'pre-wrap'}}>
        {value}
    </Box>
</TableCell>);

const AlignmentAnalysisDetails = () => {

    const { idAnalysis } = useParams();

    const [makeRequest] = useRequest();
    const [rowAlnA, setRowAlnA] = useState([]);
    const [rowAlnB, setRowAlnB] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const [analysisName, setAnalysisName] = useState('');
    const [details, setDetails] = useState({
            description: '',
            score: 0,
            sequenceA: '',
            sequenceB: '',
            type: '',
            status: '',
            alignmentType: '',
            mode: '',
            matchScore: 0,
            mismatchScore: 0,
            openGapScore: 0,
            extendGapScore: 0
    })
    


    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const getColorBaseOnBase = (base) => {
        base = base.toUpperCase();
        if (base === 'A') {
            return red[300];
        }
        if (base === 'T' || base === 'U') {
            return blue[300];
        }
        if (base === 'C') {
            return green[300];
        }
        if (base === 'G') {
            return orange[300];
        }
    }

    const onSuccessGetAlignmentByIdAnalysis = (obj) => {
        let biopython_output = {
            target: obj.data.biopython_bio_align_pairwise_aligner_input.outputs[0]?.target
            ?? obj.data.alignments[0].biological_sequences[0].bases,
            query: obj.data.biopython_bio_align_pairwise_aligner_input.outputs[0]?.query
            ?? obj.data.alignments[0].biological_sequences[1].bases,
            score: obj.data.biopython_bio_align_pairwise_aligner_input.outputs[0]?.score
            ?? 0
            }

        let target = biopython_output.target.toUpperCase()
        let query = biopython_output.query.toUpperCase()

        let [longestAln, shortestAln] = target.length > query.length ? [target, query] : [target, query];


        for (let alnIndex = shortestAln.length; alnIndex < longestAln.length; alnIndex++) {
            shortestAln += ' ';
        }

        let arrAlnA = [getMessage('alignmentAnalysisDetails.label.sequenceA')];
        let arrAlnB = [getMessage('alignmentAnalysisDetails.label.sequenceB')];

        longestAln.split('').forEach(base => arrAlnA.push(base));
        shortestAln.split('').forEach(base => arrAlnB.push(base));
        setDetails({
            description: obj.data.description,
            score: biopython_output.score,
            sequenceA: obj.data.alignments[0].biological_sequences[0].bases,
            sequenceB: obj.data.alignments[0].biological_sequences[1].bases,
            type: obj.data.type,
            status: obj.data.status,
            alignmentType: obj.data.alignments[0].biological_sequences[0].type,
            mode: obj.data.biopython_bio_align_pairwise_aligner_input.mode,
            matchScore: obj.data.biopython_bio_align_pairwise_aligner_input.match_score,
            mismatchScore: obj.data.biopython_bio_align_pairwise_aligner_input.mismatch_score,
            openGapScore: obj.data.biopython_bio_align_pairwise_aligner_input.open_gap_score,
            extendGapScore: obj.data.biopython_bio_align_pairwise_aligner_input.extend_gap_score
        });

        setRowAlnA(arrAlnA);
        setRowAlnB(arrAlnB);
        setAnalysisName(obj.data.title)
        showLoader(false);
    }

    const onFailureGetAlignmentByIdAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const getTableHeadRow = (alnA, alnB) => {
        return alnA.map((baseA, index) => {
            if (baseA === alnB[index]) {
                return <TableHeadCell index={index} color={getColorBaseOnBase(baseA)} />
            }
            return <TableHeadCell index={index} color="primary.main" />
        });
    }

    const getTableBodyRow = (rows) => {
        return rows.map((base, index) => {
            if (index === 0) {
                return <TableBodyCell index={index} value={base} color="primary.main" fontColor="primary.contrastText"/>
            }
            return <TableBodyCell 
                        index={index} 
                        value={base} 
                        color={rowAlnA[index] === rowAlnB[index] ? getColorBaseOnBase(base) : ''}
                    />
        })
    }

    useEffect(() => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_ID;

        url = url.replace('{id}', idAnalysis);

        makeRequest(url, 'GET', null, onSuccessGetAlignmentByIdAnalysis, onFailureGetAlignmentByIdAnalysis);
    }, []);

    return <>
        <Box sx={{ px: 4 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', color: 'primary.contrastText', textAlign: 'center'}}>
                    ID {idAnalysis} - {analysisName}
                </Typography>
                <div sx={{ maxHeight: '64vh'}}>
                    <TableContainer sx={{ justifyContent:'center' }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell value={getMessage('alignmentAnalysisDetails.label.alignments')} index={1} color="primary.main" cellSize={Math.max(rowAlnA.length,rowAlnB.length)}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {getTableBodyRow(rowAlnA)}
                                </TableRow>
                                <TableRow>
                                    {getTableBodyRow(rowAlnB)}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer sx={{ justifyContent:'center' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell value={getMessage('alignmentAnalysisDetails.label.details')} index={1} color="primary.main" cellSize={4}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.description')}/>
                                    <TableDetailsBodyCell value={details.description}/>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.score')}/>
                                    <TableDetailsBodyCell value={details.score}/>
                                </TableRow>
                                <TableRow>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.sequenceA')}/>
                                    <TableDetailsBodyCell value={details.sequenceA}/>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.sequenceB')}/>
                                    <TableDetailsBodyCell value={details.sequenceB}/>
                                </TableRow>

                                <TableRow>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.alignmentType')}/>
                                    <TableDetailsBodyCell value={details.alignmentType}/>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.mode')}/>
                                    <TableDetailsBodyCell value={details.mode}/>
                                </TableRow>
                                <TableRow>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.openGapScore')}/>
                                    <TableDetailsBodyCell value={details.openGapScore}/>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.extendGapScore')}/>
                                    <TableDetailsBodyCell value={details.extendGapScore}/>
                                </TableRow>
                                <TableRow>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.matchScore')}/>
                                    <TableDetailsBodyCell value={details.matchScore}/>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.mismatchScore')}/>
                                    <TableDetailsBodyCell value={details.mismatchScore}/>
                                </TableRow>
                                <TableRow>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.type')}/>
                                    <TableDetailsBodyCell value={details.type}/>
                                    <TableDetailsBodyCell color='primary.main' fontColor="primary.contrastText" value={getMessage('alignmentAnalysisDetails.label.status')}/>
                                    <TableDetailsBodyCell value={details.status}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>
        </Box>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened}
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar}
        />
        <OlatcgLoader show={isLoading} />
    </>
};

export { AlignmentAnalysisDetails };