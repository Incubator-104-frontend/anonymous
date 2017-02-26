import { combineReducers } from 'redux'
import {firebaseStateReducer} from 'redux-react-firebase'

const data = (state = { }, action) => {
	/* some code here */
	/*if( action.type === 'ADD_SAMPLE'){
		return { text: action.text };
	}else {
		return state;
	}*/
	return state;
}

const rootReducer = combineReducers({ 
	data,
	firebase: firebaseStateReducer 
});

export default rootReducer