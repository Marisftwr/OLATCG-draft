import { Science, Add } from "@mui/icons-material";
import { Button, Stack, Paper, TextField, Select, MenuItem, IconButton, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import DatabaseTypeEnum from "../infra/enums/DatabaseTypesEnum";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import ValidationService from "../services/ValidationService";
import OlatcgLoader from "./OlatcgLoader";
import OlatcgSnackbar from "./OlatcgSnackbar";
import { OlatcgStep } from "./OlatcgStep";

class AnalysisRequest{
    constructor({form}){
        this.title = form.analysisTitle;
        this.description = form.analysisDescription;
        this.type = form.analysisType;
    }
}


class HomologyRequest{
    constructor({form, sequenceForm}){
        this.database = form.databaseType;
        this.type = form.sequenceType;
        this.evalue = form.eValue;
        this.gap_open = form.openPenalty;
        this.gap_extend = form.extensionPenalty;
        this.penalty = form.penalty;
        this.biological_sequences = sequenceForm.map(seq => (
            {
                bases: seq.sequence,
                external_database_id: 'default',
                title: seq.sequenceName
            }
        ))
    }
}


const HomologyChooseSequencesStep = ({form, next}) => {
    
    const [idAnalysis, setIdAnalysis] = useState();

    const [makeRequest] = useRequest();
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [isLoading, showLoader] = useState(false);
    const [sequenceIdPairList, setSequenceIdPairList] = useState([{queryId: 1, sequence: ''}, {queryId: 2, sequence: ''}]);
    const [sequenceFormList, setSequenceFormList] = useState(<></>);

    const [analysisResponse, setAnalysisResponse] = useState({})
    const [sequenceForm, setSequenceForm] = useState([
        {
            sequenceName: '',
            sequence: '',
        },
        {
            sequenceName: '',
            sequence: '',
        },
    ])

    useEffect(() => updateSequenceFormList(), []);

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessHS = (obj) => {
        setIdAnalysis(analysisResponse.id);
        showSnackbar(getMessage('common.label.success'), 'success');
        showLoader(false);
    }

    const onFailureHS = (error) => {
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeAnalysisRequest = async (form) => {
        try{
            let url = API_ROUTES.ANALYSIS_FROM_EXPERIMENT_ID;
            url = url.replace('{experiment_id}', 1);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok){
                throw new Error('Erro na resposta');
            }

            return await response.json();
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    
    useEffect(()=>{
        if(analysisResponse.id){
            const homologyRequest = new HomologyRequest({form, sequenceForm})
            try{
                let homologyUrl = API_ROUTES.HOMOLOGY;
                homologyUrl = homologyUrl.replace('{id}', analysisResponse.id);
                
                showLoader(true);
                makeRequest(homologyUrl, 'POST', homologyRequest, onSuccessHS, onFailureHS);
            }catch (errorMessage){
                showSnackbar(errorMessage, 'error');
            }
        }
    }, [analysisResponse]);

    const makeHSRequest = async () => {
        const analysisRequest = new AnalysisRequest({form});

        try{
            form.sequences = sequenceIdPairList;
            ValidationService.validateIfFieldsAreFilled(form);
            ValidationService.validateDNASequences(form.sequences);

            setAnalysisResponse(await makeAnalysisRequest(analysisRequest));
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    const addSequence = () => {
        sequenceForm.push({            
            sequenceName: '',
            sequence: ''
        })
        updateSequenceFormList();
    }

    const updateSequenceFormList = () => {
        setSequenceFormList(sequenceForm.map((seq, index) => {
            return <>
                <Grid container spacing={0} sx={{marginTop:2, marginBottom:2}}>
                    <Grid item xs={12}>
                        <Typography variant='body2' sx={{marginLeft:1, color:'primary.main'}}>
                            {getMessage('homology.chooseSequencesStep.sequenceNumber') + (index+1)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            hiddenlabel
                            name={'sequenceTitle' + index}
                            key={index}
                            placeholder={getMessage('homology.chooseSequencesStep.namePlaceholder')}
                            fullWidth={true}
                            InputProps={{
                                style:{
                                    height: '2.4rem',
                                    fontSize: '0.8rem',
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderBottom:'none'
                                }
                            }}
                            onChange={(event) => seq.sequenceName = event.target.value}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            hiddenlabel
                            name={'sequence' + index}
                            key={index}
                            placeholder={getMessage('homology.chooseSequencesStep.sequencePlaceholder')}
                            fullWidth={true}
                            InputProps={{
                                style:{
                                    height: '2.4rem',
                                    fontSize: '0.8rem',
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    borderTop:'none'
                                }
                            }}
                            onChange={(event) => seq.sequence = event.target.value}
                            required
                        />
                    </Grid>
                </Grid>
            </>
        }));
    }

    return <>
        {!idAnalysis ? 
            <OlatcgStep 
                onClickNext={() => setIdAnalysis(idAnalysis)}
                isNextDisabled={!idAnalysis}
                stepPosition={2}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{width:'inherit'}}
                >   
                    <Paper sx={{width:'80%', padding:4, paddingBottom:6, border:3, borderRadius:8, borderColor: 'primary.main'}}>
                        {sequenceFormList}
                    </Paper>
                    <IconButton 
                        disabled={false}
                        sx={{position:'relative',
                            top:'-48px',
                            padding:0,
                            margin:0,
                            height:64,
                            width:64,
                            bgcolor:'primary.main',
                            '&:hover':{
                                bgcolor:'primary.light'
                            }
                        }}
                        onClick={() => addSequence()}>
                        <Add sx={{fontSize:48, 
                        height:48,
                        padding:1,
                        color:'primary',
                        '&:hover':{
                            color: 'primary.main'}}}/>
                    </IconButton>
                    <Button 
                        variant="contained" 
                        startIcon={<Science/>}
                        sx={{fontSize: '1.2rem', marginTop:0}}
                        onClick={() => makeHSRequest()}
                    >
                        {getMessage('homology.button.label.makeAnalysis')}
                    </Button>
                </Stack>
                <OlatcgSnackbar
                    isOpened={isSnackbarOpened} 
                    onClose={() => openSnackbar(false)}
                    status={statusSnackbar}
                    msg={msgSnackbar} 
                />
                <OlatcgLoader show={isLoading}/>
            </OlatcgStep> 
        : next(idAnalysis)}
    </>
}

export { HomologyChooseSequencesStep };