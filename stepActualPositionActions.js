import { actionTypes } from "../constants/actionTypes";

const stepActualPositionActions = {
    set: (position) => ({
        type: actionTypes.SET_STEP_ACTUAL_POSITION,
        payload: position
    }),
}

export { stepActualPositionActions };