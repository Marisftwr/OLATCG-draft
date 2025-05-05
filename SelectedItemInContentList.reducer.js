const initialState = 0;

export default function SelectedItemInContentListReducer(state = initialState, action){
    switch(action.type){
        case 'SELECT_ITEM_IN_CONTENT_LIST':
            return action.payload;
        case 'RETURN_SELECTED_ITEM_IN_CONTENT_LIST_TO_INITIAL_STATE':
            return initialState;
        default:
            return state;
    }
}