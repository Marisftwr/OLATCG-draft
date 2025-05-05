import { combineReducers } from "redux";

import selectedItemInContentList from "./SelectedItemInContentList.reducer.js";
import stepActualPosition from "./StepActualPosition.js";

const reducers = combineReducers({
    selectedItemInContentList,
    stepActualPosition,
});

export { reducers };