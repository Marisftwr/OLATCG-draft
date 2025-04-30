import { Box, Stack, Typography } from "@mui/material";
import OlatcgToolsImageCard from "../components/OlatcgToolsImageCard";
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
            href: '/tool/alignment',
            bgColor: '#83A17F'
        },
        {
            imageSrc: HomologySearch,
            imageAlt: 'Homology Search image',
            title: getMessage('tools.card.homologySearch.title'),
            description: getMessage('tools.card.homologySearch.desc'),
            href: '/tool/homology',
            bgColor: '#6FAB95'
        }
    ]

    const location = useLocation();
  
    if (location.pathname === "/tool/alignment" || location.pathname === "/tool/homology") {
        return <Outlet />;
    }

    return <>
        <Box sx={{textAlign: 'center', pt: 2, pb: 4}}  >
            <Typography variant="h3" fontFamily={'Headland One'} fontWeight={'regular'} marginBottom={10} marginTop={5}>
                {getMessage('tools.title')}
            </Typography>
            <Stack 
                direction="column"
                alignItems="center"
                justifyContent="center"
                textAlign='justify'
                spacing={4}
                py={5}
                position='center'
            >
                <Stack
                width='50%'
                >
                {
                    toolCards.map((toolCard, index) => 
                            <OlatcgToolsImageCard
                                key={index}
                                imageSrc={toolCard.imageSrc}
                                imageAlt={toolCard.imageAlt}
                                title={toolCard.title}
                                description={toolCard.description}
                                href={toolCard.href}
                                backgroundColor={toolCard.bgColor}
                            />  
                    )
                }
                
                </Stack>
                
            </Stack>
        </Box>
    </>
}

export default Tools;