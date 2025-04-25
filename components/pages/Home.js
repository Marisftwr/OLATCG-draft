import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getMessage } from "../services/MessageService";

import Logo from '../static/images/logo.png';
import Scientist from '../static/images/scientist.png';
import Settings from '../static/images/settings.png';
import PC from '../static/images/pc.png';
import OlatcgImageCard from "../components/OlatcgImageCard";
import CefetLogo from '../static/images/cefet_logo.png';
import FioCruzLogo from '../static/images/fiocruz_logo.png';
import UfzLogo from '../static/images/ufz_logo.png';

const Home = () => {
    const jumbotronStyle = {
        py: 4, px: { xs: 2, sm: 4, md: 10 }, backgroundColor: '#D3E8AC'
    };

    const descriptionsStyle = {
        p: 4, textAlign: 'center'
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
            href: '/learn'
        },
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
            alignItems={{xs: 'center', sm: "stretch"}} 
            justifyContent={{xs: 'center', sm: 'flex-start'}} 
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
                <Typography variant="h4" component="div" sx={{pt: 3}} color="#1d2b29c9" fontFamily={'Headland One'}>
                    {getMessage('home.jumbotron.description')}
                </Typography>
            </Box>        
        </Stack>
        <Stack 
            sx={descriptionsStyle}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
        >
            <Box>
                <Typography variant="h3" fontWeight={500}>
                    {getMessage('home.about.title')}
                </Typography>
                <br/>
                <Typography variant="h5">
                    {getMessage('home.about.desc')}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" fontWeight={500} marginTop={15}>
                    {getMessage('home.chooseYourPath')}
                </Typography>
                <br/>
                <Stack 
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    spacing={4}
                >
                    {
                        chooseYourPathsCardContent.map(
                            (content, index) => 
                                <OlatcgImageCard
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
            </Box>
            <Box>
                <Typography variant="h3">
                    {getMessage('home.collaboration.title')}
                </Typography>
                <Typography variant="h5">
                    {getMessage('home.collaboration.description')}
                </Typography>
                <Box sx={{'& img': { px: 6 }}}>
                <a href={'https://www.cefet-rj.br/'} target={'_blank'}><img src={CefetLogo} alt="CEFET's logo" height={200} width={300} ></img></a>
                    <img src={FioCruzLogo} alt="FioCruz's logo" height={200} width={300}></img>                    
                </Box>
            </Box>
            <br/>
        </Stack>    
    </>
}

export default Home;
