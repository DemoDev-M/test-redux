/* eslint-disable indent */
/* eslint-disable prettier/prettier */
// src/redux/reducers/breedsReducer.js

// Import các action types bạn đã định nghĩa
import {
  FETCH_BREEDS_REQUEST,
  FETCH_BREEDS_SUCCESS,
  FETCH_BREEDS_FAILURE,
} from '../actions/breedsActions';

// Trạng thái khởi tạo của reducer giống chó
const initialState = {
  breeds: [],
  loading: false,
  error: null,
};

// Reducer xử lý trạng thái giống chó
const breedsReducer = (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line indent
    case FETCH_BREEDS_REQUEST:
      return { ...state, loading: true, error: null }; // Đặt trạng thái tải, xóa lỗi cũ
    case FETCH_BREEDS_SUCCESS:
      return { ...state, loading: false, breeds: action.payload }; // Cập nhật dữ liệu giống chó, tắt tải
    case FETCH_BREEDS_FAILURE:
      return { ...state, loading: false, error: action.payload, breeds: [] }; // Cập nhật lỗi, tắt tải, xóa dữ liệu giống chó
    default:
      return state;
  }
};

export default breedsReducer;
