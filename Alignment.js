import { AnalysisDefinitionStep } from "../components/AnalysisDefinitionStep";
import { AlignmentSequenceInputStep } from "../components/AlignmentSequenceInputStep";
import { AlignmentConfigurationStep } from "../components/AlignmentConfigurationStep";
import { AlignmentFollowYourAnalysisStep } from "../components/AlignmentFollowYourAnalysisStep";
import { Step, StepLabel, Stepper } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { useSelector } from "react-redux";
import { selectors } from "../redux/constants/selectors";

const Alignment = () => {

    const labels = [
        getMessage('alignment.step0.label'), 
        getMessage('alignment.step1.label'),
        getMessage('alignment.step2.label'), 
        getMessage('alignment.step3.label')
    ];
    
    const stepActualPosition = useSelector(selectors.getStepActualPosition);

    return <>
        <Stepper sx={{py: 4}} activeStep={stepActualPosition} alternativeLabel>
            {labels.map((label, stepKey) => 
                <Step key={stepKey}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            )}
        </Stepper>

        <AnalysisDefinitionStep anType={'ALIGNMENT'} next={form =>
            <AlignmentConfigurationStep form={form} next={form =>
                <AlignmentSequenceInputStep form={form} next={idAnalysis =>
                    <AlignmentFollowYourAnalysisStep idAnalysis={idAnalysis}/>}/>}/>}/>
    </>
}

export default Alignment;