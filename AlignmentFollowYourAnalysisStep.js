import { Box, Button, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import OlatcgAlignmentTable from "./OlatcgAlignmentTable";
import { OlatcgStep } from "./OlatcgStep";
import { useNavigate } from "react-router";

const AlignmentFollowYourAnalysisStep = ({idAnalysis}) => {

    const navigateTo = useNavigate();

    return <>
        <OlatcgStep stepPosition={3} isNextDisabled={true}>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h4">
                    {getMessage('alignment.followAnalysis.title')}
                </Typography>
                <br/>
                <Typography variant="h6">
                    {getMessage('alignment.followAnalysis.desc')}
                </Typography>
                <br/>
                <OlatcgAlignmentTable idAnalysis={idAnalysis}/>
                <br/>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                >
                    <Button 
                        variant="contained" 
                        onClick={() => navigateTo("/tool")}
                    >
                        {getMessage('alignment.followAnalysis.button.label.makeAnotherAnalysis')}
                    </Button>
                </Stack>
            </Box>
        </OlatcgStep>
    </>
}

export { AlignmentFollowYourAnalysisStep };