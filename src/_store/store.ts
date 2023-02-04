import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk';

import reducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
