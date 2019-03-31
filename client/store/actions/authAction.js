import axios from 'axios';
import { setError } from './errorAction';
import { SET_CURRENT_USER } from './actionTypes';
import { setFeeds } from './feedAction';

export const setCurrentUser = user => ({
   type: SET_CURRENT_USER,
   user,
});

export const registerUser = user => async (dispatch) => {
   axios
      .post('/api/auth/register', user)
      .then((res) => {
         // console.log(res);
         dispatch(setCurrentUser(res.data));

         return true;
      })
      .catch((error) => {
         dispatch(setError(error));
         console.log(error);

         return false;
      });
};

export const loginUser = user => async (dispatch) => {
   const response = await axios.post('/api/auth/login', user);
   dispatch(setCurrentUser(response.data));
   localStorage.setItem('jwt', response.headers['x-auth-token']);
};

export const logoutUser = () => (dispatch) => {
   localStorage.removeItem('jwt');
   dispatch(setCurrentUser({}));
   dispatch(setFeeds([]));
};
