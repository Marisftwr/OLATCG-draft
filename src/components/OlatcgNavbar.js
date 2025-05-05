import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { getMessage } from "../services/MessageService";

import Logo from '../static/images/logo.png';

const OlatcgNavbar = () => {
    const navigateTo = useNavigate();

    const navItems = [
        {
            path: '/home',
            nameRef: 'appBar.navItems.home'
        },
        {
            path: '/tool',
            nameRef: 'appBar.navItems.tools'
        },
        {
            path: '/analysis',
            nameRef: 'appBar.navItems.analysis'
        },
        {
            path: '/learn',
            nameRef: 'appBar.navItems.learn'
        },
    ];

    return <>
            <AppBar position="static" backgroundColor="primary.light"  >
                <Toolbar>
                    <Box variant="h5" component="div" backgroundColor= '#b5c793'
                        sx={{ flexGrow: 1, cursor: 'pointer', pt: 0.5}} onClick={() => navigateTo('/')}>
                        <img height={80} width={80} src={Logo} alt="Logo olATCG" />
                        <Typography marginLeft={5} display={"inline"} fontSize={40} color='#516E4C' fontFamily={'Headland One'}>{getMessage('appBar.title')}</Typography>
                    </Box>
                    {navItems.map((navItem, index) => 
                        <Button  radius='30px' key={index} color="inherit" onClick={() => navigateTo(navItem.path)}>
                            <Typography paddingTop={10} variant="h6" component="div" fontWeight={'Medium'} fontFamily={'Inter'} color='#516E4C'>
                                {getMessage(navItem.nameRef)}
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        
    </>
}

export default OlatcgNavbar;
