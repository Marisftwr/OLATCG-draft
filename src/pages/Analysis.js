import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMessage } from "../services/MessageService";

const Analysis = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState('ALIGNMENT');

    const onComponentMount = () => {
        if(location.pathname === '/analysis'){
            navigateTo('/analysis/alignment');
        }
    }

    const handleLabel = () =>{
        if(location.pathname.includes('/analysis/alignment')){
            setValue('ALIGNMENT');
        } else if (location.pathname.includes('/analysis/homology')){
            setValue('HOMOLOGY');
        } else if (location.pathname.includes('/analysis/phylogeneticTree')){
            setValue('TAXONOMY_TREE');
        }
    }

    useEffect(() => {
        onComponentMount();
        handleLabel();
    }, [location, navigateTo])

    return <>
        <Box sx={{ mx: 4, mt: 4, borderBottom: 0 }}>
            <Tabs 
                value={value} 
                onChange={(event, newValue) => setValue(newValue)} 
                aria-label="analysis tabs"
                sx={{ 
                    bgcolor: 'primary.light', 
                    borderRadius: 4,
                }}
            >
                <Tab 
                    label={getMessage('common.label.alignment')} 
                    value="ALIGNMENT" 
                    onClick={() => navigateTo('/analysis/alignment')} 
                    sx={{fontSize: 25, maxWidth:'15%'}}
                />
                <Tab 
                    label={getMessage('common.label.homology')} 
                    value="HOMOLOGY" 
                    onClick={() => navigateTo('/analysis/homology')}
                    sx={{fontSize: 25, maxWidth:'15%'}}
                />
                <Tab 
                    label={getMessage('phyloTree.label.tree')} 
                    value="TAXONOMY_TREE" 
                    onClick={() => navigateTo('/analysis/phylogeneticTree')}
                    sx={{fontSize: 25, maxWidth:'15%'}}
                />
            </Tabs>
        </Box>
        <br/>
        <Outlet />
    </>
};

export { Analysis };
