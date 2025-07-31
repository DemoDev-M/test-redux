/* eslint-disable import/no-unresolved */
// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Đảm bảo import đúng cách

// Import các reducer của bạn
import breedsReducer from './reducers/breedsReducer';

// Kết hợp tất cả các reducer thành một root reducer
const rootReducer = combineReducers({
  breeds: breedsReducer,
  // Thêm các reducer khác tại đây nếu có
});

// Tạo Redux store và áp dụng middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
