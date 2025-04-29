import { Box, Stack, Typography } from "@mui/material";
import OlatcgImageCard from "../components/OlatcgImageCard";
import { getMessage } from "../services/MessageService";
import Alignment from '../static/images/alignment.png';
import HomologySearch from '../static/images/homologySearch.png';
import { Outlet, useLocation } from 'react-router-dom';

const Tools = () => {
    const toolCards = [
        {
            imageSrc: Alignment,
            imageAlt: 'Alignment\'s image',
            title: getMessage('tools.card.alignment.title'),
            description: getMessage('tools.card.alignment.desc'),
            href: '/tool/alignment'
        },
        {
            imageSrc: HomologySearch,
            imageAlt: 'Homology Search image',
            title: getMessage('tools.card.homologySearch.title'),
            description: getMessage('tools.card.homologySearch.desc'),
            href: '/tool/homology'
        }
    ]

    const location = useLocation();
  
    if (location.pathname === "/tool/alignment" || location.pathname === "/tool/homology") {
        return <Outlet />;
    }

    return <>
        <Box sx={{textAlign: 'center', pt: 2, pb: 4}}>
            <Typography variant="h3" fontFamily={'Headland One'} fontWeight={'regular'} marginBottom={10}>
                {getMessage('tools.title')}
            </Typography>
            <Stack 
                direction="column"
                alignItems="center"
                justifyContent="center"
                float="right"
                spacing={4}
                py={5}
                backgroundColor = {'#83A17F'}
            >
                {
                    toolCards.map((toolCard, index) => 
                            <OlatcgImageCard
                                key={index}
                                imageSrc={toolCard.imageSrc}
                                imageAlt={toolCard.imageAlt}
                                title={toolCard.title}
                                description={toolCard.description}
                                href={toolCard.href}
                            />  
                    )
                }
                
            </Stack>
        </Box>
    </>
}

export default Tools;
