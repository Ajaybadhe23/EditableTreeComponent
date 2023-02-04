import { log } from "console";
import {
  AAD_HANDLER,
  CHANGE_SELECT_DATA,
  DISCRIPTION_CALL,
  GET_SELECT_DATA,
} from "../constants/TreeConstant";

const initialState = {
  sideBarTree: [
    {
      Level: "Level 1",
      subLevel: [{ Level: "Level 1.1", subLevel: [{ Level: "Level 1.1.1" }] }],
    },
    {
      Level: "Level 2",
      subLevel: [
        {
          Level: "Level 2.1",
          subLevel: [{ Level: "Level 2.1.1" }, { Level: "Level 2.1.2" }],
        },
      ],
    },
  ],
  selectedData: [],
  discriptionData:{}
};
const TreeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AAD_HANDLER:
      return { ...state, sideBarTree: action.payload };
    case GET_SELECT_DATA:
      return { ...state, selectedData: action.payload };
    case CHANGE_SELECT_DATA:
      return { ...state, sideBarTree: action.payload };
    case DISCRIPTION_CALL:
      return { ...state, discriptionData: action.payload };

    default:
      return state;
  }
};
export default TreeReducer;
