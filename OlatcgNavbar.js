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
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Box variant="h5" component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer', pt: 0.4}} onClick={() => navigateTo('/')}>
                        <img height={50} width={50} src={Logo} alt="Logo olATCG" />
                    </Box>
                    {navItems.map((navItem, index) => 
                        <Button key={index} color="inherit" onClick={() => navigateTo(navItem.path)}>
                            <Typography variant="h6" component="div">
                                {getMessage(navItem.nameRef)}
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        
    </>
}

export default OlatcgNavbar;