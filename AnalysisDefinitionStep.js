import { useState } from "react";
import { TextField,  Typography, Box, Stack, Select, MenuItem, FormControl, InputAdornment } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { OlatcgStep } from "./OlatcgStep";

const AnalysisDefinitionStep = ({anType, next}) => {
    const [isNextShowed, showNext] = useState(false);
    const [analysisTitle, setAnalysisTitle] = useState('');
    const [analysisDescription, setAnalysisDescription] = useState('');
    const [analysisType, setAnalysisType] = useState(anType);

    const maxTitleLength = 20;
    const maxDescriptionLength = 100;
    
    return <>
    {!isNextShowed ? 
        <OlatcgStep 
            onClickNext={() => showNext(true)}
            stepPosition={0}
            isNextDisabled={analysisTitle.length < 1 || analysisDescription.length < 1 || analysisTitle.length > maxTitleLength || analysisDescription.length > maxDescriptionLength}
        >
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={4}
            >
                <Box sx={{width: 600, textAlign: 'center'}}>
                    <Typography gutterBottom>
                        {getMessage('alignment.input.label.analysisTitle')}
                    </Typography>
                    <TextField
                        name='analysisTitle'
                        id='analysisTitle'
                        placeholder={getMessage('alignment.input.placeholder.analysisTitle')}
                        error={analysisTitle.length>maxTitleLength}
                        InputProps={{
                            endAdornment:(<InputAdornment position='end'>
                                {maxTitleLength - analysisTitle.length}
                                </InputAdornment>)
                        }}
                        sx={{width: '100%'}}
                        onChange={(event) => setAnalysisTitle(event.target.value)}
                        required
                        focused
                    />
                </Box>
                <Box sx={{width: 600, textAlign: 'center'}}>
                    <Typography gutterBottom>
                        {getMessage('alignment.input.label.analysisDescription')}
                    </Typography>
                    <TextField
                        name='analysisDescription'
                        id='analysisDescription'
                        placeholder={getMessage('alignment.input.placeholder.analysisDescription')}
                        error={analysisDescription.length>maxDescriptionLength}
                        InputProps={{
                            endAdornment:(<InputAdornment position='end'
                                sx={{marginTop: 'auto'}}>
                                {maxDescriptionLength - analysisDescription.length}
                                </InputAdornment>)
                        }}
                        sx={{width: '100%'}}
                        onChange={(event) => setAnalysisDescription(event.target.value)}
                        rows={6}
                        multiline
                        required
                        focused
                    />
                </Box>
            </Stack>
        
        </OlatcgStep>
    : next({
        analysisTitle: analysisTitle,
        analysisDescription: analysisDescription,
        analysisType: analysisType,
    })
    }
</>

}

export { AnalysisDefinitionStep };