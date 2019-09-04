import { combineReducers } from 'redux-immutable'
import { reducer as mainReducer } from '../src/main/store'
export default combineReducers({
    main: mainReducer
})