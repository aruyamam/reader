import {
   ASYNC_ACTION_START,
   ASYNC_ACTION_END,
   FETCH_FEEDS_ACTION_START,
   FETCH_FEEDS_ACTION_END,
} from './actionTypes';

export const asyncActionStart = () => ({
   type: ASYNC_ACTION_START,
});

export const asyncActionEnd = () => ({
   type: ASYNC_ACTION_END,
});

export const fetchFeedsActionStart = () => ({
   type: FETCH_FEEDS_ACTION_START,
});

export const fetchFeedsActionEnd = () => ({
   type: FETCH_FEEDS_ACTION_END,
});
