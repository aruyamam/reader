import { ASYNC_ACTION_START, ASYNC_ACTION_END } from './actionTypes';

export const asyncActionStart = () => ({
   type: ASYNC_ACTION_START,
});

export const asyncActionEnd = () => ({
   type: ASYNC_ACTION_END,
});
