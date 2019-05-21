import axios from 'axios';
import { SET_CURRENT_USER } from './actionTypes';
import { setError } from './errorAction';
import { setFeeds } from './feedAction';
import { asyncActionStart, asyncActionEnd } from './asyncAction';
import setAuthToken from '../../helper/setAuthToken';

export const setCurrentUser = user => ({
   type: SET_CURRENT_USER,
   user,
});

export const registerUser = user => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const response = await axios.post('/api/auth/register', user);
      dispatch(setCurrentUser(response.data));
      localStorage.setItem('jwt', response.headers['x-auth-token']);
      setAuthToken(response.headers['x-auth-token']);
      dispatch(asyncActionEnd());

      return response.data;
   }
   catch (err) {
      dispatch(setError(err.response.data.error));
      dispatch(asyncActionEnd());

      return false;
   }
};

export const loginUser = user => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const response = await axios.post('/api/auth/login', user);
      dispatch(setCurrentUser(response.data));
      localStorage.setItem('jwt', response.headers['x-auth-token']);
      setAuthToken(response.headers['x-auth-token']);
      dispatch(asyncActionEnd());

      return response.data;
   }
   catch (err) {
      dispatch(setError(err.response.data.error));
      dispatch(asyncActionEnd());

      return false;
   }
};

export const logoutUser = () => (dispatch) => {
   localStorage.removeItem('jwt');
   setAuthToken();
   dispatch(setCurrentUser({}));
   dispatch(setFeeds([]));
};
