import { combineReducers } from 'redux-immutable'
import { reducer as mainReducer } from '../src-page/main/store'
export default combineReducers({
    main: mainReducer
})