import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import ParkIcon from '@mui/icons-material/Park';


const OlatcgPhylogeneticTreeModal = ({phyloTreeBody}) =>{
    let { idAnalysis } = useParams();
    const navigateTo = useNavigate();
    const [makeRequest] = useRequest();
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [treeId, setTreeId] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    //Solucao temporaria
    const onSuccessPostPhyloTree = (obj) =>{
        setTreeId(obj.analysis_id)
        showLoader(false);
        setOpen(true)
    }

    const onFailurePostPhyloTree = (error) =>{
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }


    const makePhyloTreeRequest = () =>{
        showLoader(true);

        let url = API_ROUTES.PHYLOGENETIC_TREE;
        url = url.replace('{id}', idAnalysis);

        makeRequest(url, 'POST', phyloTreeBody, onSuccessPostPhyloTree, onFailurePostPhyloTree);

    }

    const handlePhyloTree = () => {
        if(treeId == 0){
            makePhyloTreeRequest();
        } else {
            setOpen(true);
        }
    }



    return <>
        <Button startIcon={<ParkIcon/>} sx={{width:'100%', color: 'primary.contrastText', backgroundColor:'primary.dark', borderTopRightRadius: 0, borderTopLeftRadius: 0}} onClick={() => handlePhyloTree()}>
            {getMessage('common.label.show.tree')}
        </Button>


        <Modal open={open} onClose={handleClose}>
            <Paper sx={{backgroundColor:'primary.light', textAlign:'center', maxWidth:'60vw', position:'absolute', top:'50%', left:'50%',transform: 'translate(-50%, -50%)', borderRadius:'2rem'}}>
                <Typography variant="h4" sx={{p:2,px:8, backgroundColor: 'primary.dark', color: 'primary.contrastText', textAlign: 'center', borderTopRightRadius:'2rem', borderTopLeftRadius:'2rem'}}>
                    {getMessage('phyloTree.label.availableTree')}
                </Typography>
                <Box sx={{p:'1rem'}}>
                    <Typography variant="h5" sx={{textAlign: 'center', mb:3}}>
                        {getMessage('phyloTree.label.tree')+' - ID ' + treeId}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center', m:3}}>
                        {getMessage('phyloTree.modal.accessBelow')}
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => navigateTo("/analysis/phylogeneticTree/" + treeId)}
                        sx={{fontSize:'1.2rem', width:'75%'}}
                    >
                        {getMessage('common.label.show.tree')}
                    </Button>
                </Box>
            </Paper>
        </Modal>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
        />
        <OlatcgLoader show={isLoading}/>
    </>

}

export default OlatcgPhylogeneticTreeModal