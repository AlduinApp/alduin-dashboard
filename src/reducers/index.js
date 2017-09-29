import { combineReducers } from 'redux'
import { reducer as tooltip } from 'redux-tooltip'

import StatsReducer from './stats-reducer'
import UIReducer from './ui-reducer'

export default combineReducers({
  StatsReducer,
  UIReducer,
  tooltip
})