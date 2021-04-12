// import characterReducer from './characterReducer';
// import counterReducer from './counterReducer';
import todoReducer from './todoReducer';
import userReducer from './userReducer'
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    // characters: characterReducer,
    users: userReducer,
    todos:todoReducer
})

export default rootReducer