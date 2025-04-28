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
            <AppBar position="static" backgroundColor= '#D3E8AC'  >
                <Toolbar>
                    <Box variant="h5" component="div" backgroundColor= '#C5D9A0'
                        sx={{ flexGrow: 1, cursor: 'pointer', pt: 0.5}} onClick={() => navigateTo('/')}>
                        <img height={50} width={50} src={Logo} alt="Logo olATCG" />
                    </Box>
                    {navItems.map((navItem, index) => 
                        <Button radius='30px' key={index} color="inherit" onClick={() => navigateTo(navItem.path)}>
                            <Typography variant="p" component="div" fontFamily={'Inter'} color='#516E4C'>
                                {getMessage(navItem.nameRef)}
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        
    </>
}

export default OlatcgNavbar;
