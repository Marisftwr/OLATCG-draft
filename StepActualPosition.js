const initialState = 0;

export default function StepActualPosition(state = initialState, action){
    switch(action.type){
        case 'SET_STEP_ACTUAL_POSITION':
            return action.payload;
        default:
            return state;
    }
}