import React from 'react';
import OlatcgPhyloTree from '../components/OlatcgPhyloTree';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const PhyloTree = () => {
  let treeId = useParams();
  const [makeRequest] = useRequest();
  const navigateTo = useNavigate();
  const [isLoading, showLoader] = useState(false);
  const [isSnackbarOpened, openSnackbar] = useState(false);
  const [statusSnackbar, setStatusSanckbar] = useState('error');
  const [msgSnackbar, setMsgSnackbar] = useState('');
  const [idAnalysis, setIdAnalysis] = useState(0);
  const [analysisName, setAnalysisName] = useState('');
  const [newickTree, setNewickTree] = useState('');
  

  const showSnackbar = (msg, status) => {
    setMsgSnackbar(msg);
    setStatusSanckbar(status);
    openSnackbar(true);
}

  const onFailureGetPhyloTree = (error) => {
    showSnackbar(getMessage(error.errorDescription), 'error');
    showLoader(false);
}

const regNewick = (newick) =>{
  
  let regNewick = newick.replace(/(\d+\.\d+)/g, (val) => {
    return (parseFloat(val) + 0.00001).toString();
  });

  return regNewick
}

const onSuccessGetPhyloTree = (obj) => {

  setIdAnalysis(obj.data.generated_from_analysis);
  setAnalysisName(obj.data.title)
  setNewickTree(regNewick(obj.data.fasttree_inputs[0].outputs[0].file_content));

  showLoader(false);
}

useEffect(() => {
  showLoader(true);
  
  let url = API_ROUTES.GET_ANALYSIS_BY_ID;
  url = url.replace('{id}', treeId.idAnalysis);

  makeRequest(url, 'GET', null, onSuccessGetPhyloTree, onFailureGetPhyloTree);
}, [treeId]);

    return ( <>
          <Box sx={{ px: 4, my: 'auto'}}>
            <Paper sx={{ maxWidth:'90%', /*overflow: 'hidden',*/ bgcolor: 'primary.light', margin: 'auto'}}>
              <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', borderTopRightRadius: '4px', borderTopLeftRadius: '4px', color: 'primary.contrastText', textAlign: 'center'}}>
                ID {idAnalysis} - {analysisName}
              </Typography>
              {newickTree != '' && (
                 <OlatcgPhyloTree newick={newickTree} />
                )
                }
              <Button startIcon={<ContentPasteIcon/>} sx={{width:'100%', color: 'primary.contrastText', backgroundColor:'primary.dark', borderTopRightRadius: 0, borderTopLeftRadius: 0}} onClick={() => idAnalysis !=0 && navigateTo("/analysis/homology/" + idAnalysis)}>
                {getMessage('phyloTree.label.return')}
              </Button>
            </Paper>
          </Box>
          <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
          />
          <OlatcgLoader show={isLoading}/>
        </>

      );
}

export default PhyloTree;