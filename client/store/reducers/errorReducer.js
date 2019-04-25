import { CLEAR_ERROR, SET_ERROR } from '../actions/actionTypes';

const initialState = {
   message: '',
};

const errorReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ERROR:
         return {
            message: action.error,
         };

      case CLEAR_ERROR:
         return {
            message: '',
         };

      default:
         return state;
   }
};

export default errorReducer;
