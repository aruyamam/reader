import { CLEAR_ERROR, SET_ERROR } from './actionTypes';

export const setError = error => ({
   type: SET_ERROR,
   error,
});

export const clearError = () => ({
   type: CLEAR_ERROR,
});
