import { ASYNC_ACTION_START, ASYNC_ACTION_END } from '../actions/actionTypes';

const initialState = {
   loading: false,
};

const asyncActionReducer = (state = initialState, action) => {
   switch (action.type) {
      case ASYNC_ACTION_START:
         return {
            loading: true,
         };

      case ASYNC_ACTION_END:
         return {
            loading: false,
         };

      default:
         return state;
   }
};

export default asyncActionReducer;
