/* eslint-disable no-undef */
// src/redux/actions/breedsActions.js

// Định nghĩa các kiểu hành động (Action Types)
export const FETCH_BREEDS_REQUEST = 'FETCH_BREEDS_REQUEST';
export const FETCH_BREEDS_SUCCESS = 'FETCH_BREEDS_SUCCESS';
export const FETCH_BREEDS_FAILURE = 'FETCH_BREEDS_FAILURE';

// Hàm tạo hành động (Action Creators)
export const fetchBreedsRequest = () => ({ type: FETCH_BREEDS_REQUEST });
export const fetchBreedsSuccess = breeds => ({
  type: FETCH_BREEDS_SUCCESS,
  payload: breeds,
});
export const fetchBreedsFailure = error => ({
  type: FETCH_BREEDS_FAILURE,
  payload: error,
});

// Hàm tạo hành động thunk để gọi API
export const fetchBreeds = () => {
  return async dispatch => {
    dispatch(fetchBreedsRequest()); // Gửi hành động yêu cầu để hiển thị trạng thái tải
    try {
      const response = await fetch('https://dogapi.dog/api/v2/breeds');
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }
      const data = await response.json();
      const breeds = data.data.map(item => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        life: item.attributes.life,
        maleWeight: item.attributes.male_weight,
        femaleWeight: item.attributes.female_weight,
      }));
      dispatch(fetchBreedsSuccess(breeds)); // Gửi hành động thành công với dữ liệu đã lấy
    } catch (error) {
      console.error('Không thể lấy thông tin giống chó:', error);
      dispatch(
        fetchBreedsFailure(
          error.message ||
            'Không thể lấy thông tin giống chó. Vui lòng kiểm tra kết nối internet của bạn.'
        )
      ); // Gửi hành động lỗi với thông báo lỗi
    }
  };
};
