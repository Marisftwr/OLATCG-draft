import { Button, Paper, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { useNavigate } from "react-router";

const OlatcgImageCard = ({
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    imageRadius,
    title,
    description,
    buttonLabel,
    href 
}) => {
    
    const navigateTo = useNavigate();

    return <>
        
            <img src={imageSrc} alt={imageAlt} with={imageWidth ? imageWidth : 300} height={imageHeight ? imageHeight : 300} style={{borderRadius:20}}></img>
            <Typography variant="h4" color="#333333" fontFamily={'Inter'} fontWeight={'bold'} marginBottom={15}>
                {title}
            </Typography>
            <br></br>
            <Typography variant="p" fontWeight={600} color="#3D3030">
                {description}
            </Typography>
            <br /><br /><br></br>
            <Button variant="contained" onClick={() => navigateTo(href)}>
                {buttonLabel ? buttonLabel : getMessage('common.label.clickHere')}
            </Button>
    </>
}

export default OlatcgImageCard;
