// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import * as fileops from './fileops';

const rootReducer = combineReducers({
  fileops,
  counter,
  routing
});

export default rootReducer;
