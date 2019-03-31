import { SET_ERRORS } from '../actions/actionTypes';

const initialState = {
   error: {},
};

const errorReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ERRORS:
         return {
            error: action.error,
         };

      default:
         return state;
   }
};

export default errorReducer;
