import { Button, Paper, Typography, Box, Stack } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { useNavigate } from "react-router";

const OlatcgImageCard = ({
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    title,
    description,
    buttonLabel,
    href,
    bgColor
}) => {
    
    const navigateTo = useNavigate();

    return <>
        <Stack flexDirection='row' marginBottom={10} alignItems='center' backgroundColor = {bgColor}>
            <Box>
                <img src={imageSrc} alt={imageAlt} with={imageWidth ? imageWidth : 350} height={imageHeight ? imageHeight : 350} style={{borderRadius:20}}></img>
            </Box>
            <Stack flexDirection='column' marginLeft={10} marginRight={8}>
                <Box>
                    <Typography variant="h4" color="#333333" fontFamily={'Inter'} fontWeight={'bold'} marginBottom={10}>
                        {title}
                    </Typography>
                    <br></br>
                    <Typography variant="p" fontWeight={600} color="#3D3030">
                        {description}
                    </Typography>
                    <br /><br /><br /><br />
                    <Button variant="contained" onClick={() => navigateTo(href)}>
                        {buttonLabel ? buttonLabel : getMessage('common.label.clickHere')}
                    </Button>
                </Box>
            </Stack>
               
        </Stack>
                     
    </>
}

export default OlatcgImageCard;