import { SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
   user: {
      isAuthenticated: false,
   },
};

const authReducer = (state = initialState, action) => {
   // console.log(action);
   switch (action.type) {
      case SET_CURRENT_USER:
         return {
            user: {
               ...action.user,
               isAuthenticated: Object.keys(action.user).length > 0,
            },
         };

      default:
         return state;
   }
};

export default authReducer;
