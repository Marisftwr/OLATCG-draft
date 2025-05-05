import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, Stack, Typography, Tooltip } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { getMessage } from "../services/MessageService";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum";
import AlignmentTypeEnum from "../infra/enums/AlignmentTypeEnum";

//lalalalalalalalalalala
const AlignmentConfigurationStep = ({form, next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [openPenalty, setOpenPenalty] = useState(0);
    const [extensionPenalty, setExtensionPenalty] = useState(0);
    const [matchScore, setMatchScore] = useState(0);
    const [mismatchScore, setMismatchScore] = useState(0);
    const [alignmentType, setAlignmentType] = useState('global');
    
    const alignmentTypes = AlignmentTypeEnum.getSelectStructure();

    return <>
        {!isNextShowed ? 
            <OlatcgStep 
                onClickNext={() => showNext(true)}
                stepPosition={1}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={6}
                >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}>
                    <Box sx={{width: 400, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.openPenalty')}
                            <Tooltip title={getMessage('alignment.tooltip.openPenalty')} placement='top' arrow>
                                <HelpIcon sx={{verticalAlign: 'middle',
                                    fontSize:'inherit',
                                    marginLeft: 0.6,
                                    color:'primary.main',
                                    '&:hover':{
                                        color: 'primary.light'
                                    }}}/>
                            </Tooltip>
                        </Typography>
                        <Slider 
                            id="openPenalty"
                            name="openPenalty"
                            value={openPenalty}
                            min={-20}
                            max={20}
                            sx={{width: '75%'}}
                            aria-label="Default" 
                            valueLabelDisplay="auto"
                            onChange={event => setOpenPenalty(event.target.value)}
                        />
                    </Box>
                    <Box sx={{width: 400, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.extensionPenalty')}
                            <Tooltip title={getMessage('alignment.tooltip.extensionPenalty')} placement='top' arrow>
                                <HelpIcon sx={{verticalAlign: 'middle',
                                    fontSize:'inherit',
                                    marginLeft: 0.6,
                                    color:'primary.main',
                                    '&:hover':{
                                        color: 'primary.light'
                                    }}}/>
                            </Tooltip>
                        </Typography>
                        <Slider 
                            id="extensionPenalty"
                            name="extensionPenalty"
                            value={extensionPenalty}
                            min={-20}
                            max={20}
                            sx={{width: '75%'}}
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            onChange={event => setExtensionPenalty(event.target.value)}
                        />
                    </Box>
                    </Stack>
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={4}>
                        <Box sx={{width: 400, textAlign: 'center'}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.matchScore')}
                                <Tooltip title={getMessage('alignment.tooltip.matchScore')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <Slider 
                                id="matchScore"
                                name="matchScore"
                                value={matchScore}
                                min={-20}
                                max={20}
                                sx={{width: '75%'}}
                                aria-label="Default" 
                                valueLabelDisplay="auto" 
                                onChange={event => setMatchScore(event.target.value)}
                            />
                        </Box>
                        <Box sx={{width: 400, textAlign: 'center'}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.mismatchScore')}
                                <Tooltip title={getMessage('alignment.tooltip.mismatchScore')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <Slider 
                                id="mismatchScore"
                                name="mismatchScore"
                                value={mismatchScore}
                                min={-20}
                                max={20}
                                sx={{width: '75%'}}
                                aria-label="Default" 
                                valueLabelDisplay="auto" 
                                onChange={event => setMismatchScore(event.target.value)}
                            />
                        </Box>
                    </Stack>
                </Stack>
                <Box sx={{width: 200, mt:2, mx:'auto', textAlign: 'center'}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.alignmentType')}
                                <Tooltip title={getMessage('alignment.tooltip.alignmentType')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <Select
                                id="PI_ROUTES.ALIGN"
                                name="mode"
                                value={alignmentType}
                                onChange={event => setAlignmentType(event.target.value)}
                            >
                                {
                                    alignmentTypes.map((type, index) =>
                                        <MenuItem
                                            key={index} 
                                            value={type.value}
                                        >
                                            {type.label}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </Box>
            </OlatcgStep> 
        : next({
            analysisTitle: form.analysisTitle,
            analysisDescription: form.analysisDescription,
            analysisType: form.analysisType,
            openPenalty: openPenalty,
            extensionPenalty: extensionPenalty,
            matchScore: matchScore,
            mismatchScore: mismatchScore,
            alignmentType: alignmentType
        })}
    </>
}

export { AlignmentConfigurationStep };
