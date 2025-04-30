import { Box, Typography } from "@mui/material";
import { color, fontFamily, Stack } from "@mui/system";
import { getMessage } from "../services/MessageService";

import Logo from '../static/images/logo.png';
import Scientist from '../static/images/scientist.png';
import Settings from '../static/images/settings.png';
import PC from '../static/images/pc.png';
import OlatcgHomeImageCard from "../components/OlatcgHomeImageCard";
import CefetLogo from '../static/images/logoCefet.png';
import FioCruzLogo from '../static/images/logoFundacaoOsorio.png';
import UfzLogo from '../static/images/ufz_logo.png';
import Olatcg from '../static/images/olatcg_carousel_Img1.png';

const Home = () => {
    const jumbotronStyle = {
        py: 4, px: { xs: 2, sm: 4, md: 10 }, backgroundColor: '#e7f0d8', fontFamily:'Headland One',
    };

    const descriptionsStyle = {
        p: 4, textAlign: 'justify', color: '#516E4C',
    };

    const baseColorsInOLATCGsName = [
        {letter: 'A', color: '#516E4C'},
        {letter: 'T', color: '#516E4C'},
        {letter: 'C', color: '#516E4C'},
        {letter: 'G', color: '#516E4C'}
    ];

    const chooseYourPathsCardContent = [
        {
            imageSrc: Scientist,
            imageAlt: 'learn path',
            title: getMessage('home.chooseYourPath.card.learn.title'),
            description: getMessage('home.chooseYourPath.card.learn.desc'),
            href: '/learn',        },
        {
            imageSrc: Logo,
            imageAlt: 'tools path',
            title: getMessage('home.chooseYourPath.card.tools.title'),
            description: getMessage('home.chooseYourPath.card.tools.desc'),
            href: '/tool'
        },
    ];

    return <>
        <Stack sx={jumbotronStyle} 
            position="static" direction="row"
            alignItems={{xs: 'center', sm: "center"}} 
            justifyContent={{xs: 'center', sm: 'center'}} 
            spacing={{xs: 0, sm: 12}}
            >

            <Box textAlign="center">
                <Typography variant="h2" color="#516E4C" fontFamily={'Headland One'}>
                    {getMessage('home.jumbotron.title')}
                    OL
                    {baseColorsInOLATCGsName.map((base, index) => 
                        <span key={index} style={{color: base.color}}>{base.letter}</span>
                    )}
                </Typography>
                <Typography variant="h4" component="div" sx={{pt: 3}} color="#1d2b29c9" fontFamily={'Headland One'} marginBottom={5} >
                    {getMessage('home.jumbotron.description')}
                </Typography>
                <img src={Olatcg} alt='Olatcg' style={{borderRadius: 10}} />
            </Box>        
        </Stack>
        <Stack 
            sx={descriptionsStyle}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
            marginTop={10}
        >
            <Box>
                <Typography variant="h3" fontWeight={500} fontFamily={'Inter'}>
                    {getMessage('home.about.title')}
                </Typography>
                <br/>
                <Typography variant="h5" fontFamily={'Inter'} fontWeight={'medium'}>
                    {getMessage('home.about.desc')}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" fontWeight={500} marginTop={15} marginBottom={15}>
                    {getMessage('home.chooseYourPath')}
                </Typography>
                <br/>
                <Stack 
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                >
                    <Stack
                    width='50%'>
                    {
                        chooseYourPathsCardContent.map(
                            (content, index) => 
                                 <OlatcgHomeImageCard
                                    key={index}
                                    imageSrc={content.imageSrc}
                                    imageAlt={content.imageAlt}
                                    title={content.title}
                                    description={content.description}
                                    href={content.href}
                                />
                        )
                    }
                    
                    </Stack>
                </Stack>
            </Box>
            <br/>
        </Stack>    
    </>
}

export default Home;