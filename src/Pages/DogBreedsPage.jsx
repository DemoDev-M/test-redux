/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBreeds,
  FETCH_BREEDS_FAILURE,
} from '../redux/actions/breedsActions'; // Thêm FETCH_BREEDS_FAILURE
import BreedListPresentation from '../Components/BreedListPresentation';

// Đây là component container, chịu trách nhiệm về logic và dữ liệu
const DogBreedsPage = () => {
  const dispatch = useDispatch();
  const { breeds, loading, error } = useSelector(state => state.breeds);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const breedsPerPage = 9;

  useEffect(() => {
    // Gửi yêu cầu lấy dữ liệu
    dispatch(fetchBreeds());

    // Thiết lập một bộ đếm thời gian 10 giây
    const loadingTimeout = setTimeout(() => {
      // Gửi action lỗi timeout
      dispatch({
        type: FETCH_BREEDS_FAILURE,
        payload:
          'Thời gian tải quá lâu. Vui lòng kiểm tra kết nối mạng và thử lại.',
      });
    }, 10000); // 10000ms = 10s

    // Dọn dẹp (cleanup) timer khi component unmount hoặc khi dependency thay đổi
    return () => clearTimeout(loadingTimeout);
  }, [dispatch]); // Dependency array chỉ có dispatch để useEffect chạy 1 lần duy nhất khi mount

  // Logic phân trang được định nghĩa ở đây
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(breeds.length / breedsPerPage);
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Tạo một object chứa tất cả props cần thiết cho Pagination
  const paginationProps = {
    breedsPerPage,
    totalBreeds: breeds.length,
    currentPage,
    paginate,
    handlePreviousPage,
    handleNextPage,
  };

  return (
    <BreedListPresentation
      breeds={breeds}
      loading={loading}
      error={error}
      paginationProps={paginationProps}
    />
  );
};

export default DogBreedsPage;
