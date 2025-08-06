// src/pages/DogBreedsPage.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from '../redux/actions/breedsActions';
import BreedListPresentation from '../Components/BreedListPresentation';

// Đây là component container, chịu trách nhiệm về logic và dữ liệu
const DogBreedsPage = () => {
  const dispatch = useDispatch();
  const { breeds, loading, error } = useSelector(state => state.breeds);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const breedsPerPage = 9;

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

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
