import { useState } from "react";
import { useDispatch } from "react-redux";
import { stepActualPositionActions } from "../redux/actions/stepActualPositionActions";
import { getMessage } from "../services/MessageService";

const { NavigateNext } = require("@mui/icons-material")
const { Grid, Tooltip, IconButton } = require("@mui/material")

const OlatcgStep = ({children, onClickNext, isNextDisabled, stepPosition}) => {
    const dispatch = useDispatch();

    useState(() => 
        dispatch(stepActualPositionActions.set(stepPosition)), 
    [dispatch]);

    return <>
        <Grid container>
            <Grid item xs={2} sx={{align: 'center'}}>
            </Grid>
            <Grid item xs={8} sx={{bgcolor: '#f0f0f0', border: '1px outset #d6d6d6', p: 4, mb: 6}}>
                {children}
            </Grid>
            <Grid item xs={2}>
                <Tooltip 
                    title={getMessage('steper.button.label.next')}
                    sx={{position: 'fixed', bgcolor: 'primary.main', bottom: '40vh', right: '10vh'}}
                >
                    <IconButton 
                        onClick={() => onClickNext?.()}
                        disabled={isNextDisabled}
                    >
                        <NavigateNext sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </>
}

export { OlatcgStep };