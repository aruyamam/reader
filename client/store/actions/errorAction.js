import { SET_ERRORS } from './actionTypes';

export const setError = error => ({
   type: SET_ERRORS,
   error,
});

export const clearError = () => {};
