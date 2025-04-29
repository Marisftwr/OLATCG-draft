import { getMessage } from "../services/MessageService";
import { Link, Typography, Box } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { Stack } from "@mui/system";
import CefetLogo from '../static/images/logoCefet.png';
import FundOsorioLogo from '../static/images/logoFundacaoOsorio.png';

const OlatcgFooter = () => {
    return <>
        <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{bottom: 0, backgroundColor: '#95AB6D', color: "#000000", paddingBottom: 5, paddingTop: 5, paddingLeft: 5}}
        >
            <Box alignItems="center">
                <Typography variant="h4" fontWeight='bold'>
                    {getMessage('home.collaboration.title')}
                </Typography>
                <Typography variant="h6" component="p">
                    {getMessage('home.collaboration.description')}
                </Typography>
                <Box sx={{'& img': { px: 6 }}}>
                    <a href={'https://www.cefet-rj.br/'} target={'_blank'}><img src={CefetLogo} alt="CEFET's logo" height={150} width={200}></img></a>
                    <a href={'https://www.fosorio.g12.br/'} target='_blank'><img src={FundOsorioLogo} alt="FioCruz's logo" height={125} width={175}></img> </a>                   
                </Box>
            </Box>
            <Typography variant="h6" component="div">
                <GitHub />
                <Link href="https://github.com/LuizMVB" underline="hover" sx={{color: "#000000", pr: 2}}><span style={{paddingLeft: 8}}>{getMessage('common.developedBy')}</span></Link>
            </Typography>
        </Stack>       
    </>
}

export default OlatcgFooter;