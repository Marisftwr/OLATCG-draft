import { useDispatch } from "react-redux";

const useContentList = () => {
    const dispatch = useDispatch();

    const selectItem = (index) => {
        dispatch({
            type: 'SELECT_ITEM_IN_CONTENT_LIST',
            payload: index,
        });
    };

    const reestartContentList = () => {
        dispatch({
            type: 'RETURN_SELECTED_ITEM_IN_CONTENT_LIST_TO_INITIAL_STATE'
        });
    };

    return [selectItem, reestartContentList];
};

export default useContentList;