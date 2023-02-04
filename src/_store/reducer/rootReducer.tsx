import { combineReducers } from 'redux';
import TreeReducer from './TreeReducer'

const reducer = combineReducers({
    TreeReducer
})
export type RootState = ReturnType<typeof reducer>
export default reducer

