import { AAD_HANDLER, CHANGE_SELECT_DATA, DISCRIPTION_CALL, GET_SELECT_DATA } from "../constants/TreeConstant";



export const AddHandler = (value: any) => (dispatch: Function) => {
    dispatch({ type: AAD_HANDLER, payload: value });
}

export const setSelectedData = (value: any) => (dispatch: Function) => {
  dispatch({ type: GET_SELECT_DATA, payload: value });
};
export const changeHandler = (value: any) => (dispatch: Function) => {
  dispatch({ type: CHANGE_SELECT_DATA, payload: value });
};


export const discriptionHandler = (value: any) => (dispatch: Function) => {
  dispatch({ type: DISCRIPTION_CALL, payload: value });
};