/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/BreedListPresentation.jsx

import React from 'react';
import BreedCard from './BreedCard';
import Pagination from './Pagination';

// Component này chỉ có nhiệm vụ trình bày dữ liệu
// Nó nhận tất cả dữ liệu và logic phân trang qua props
const BreedListPresentation = ({ breeds, loading, error, paginationProps }) => {
  const {
    breedsPerPage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    totalBreeds,
    currentPage,
    paginate,
    handlePreviousPage,
    handleNextPage,
  } = paginationProps;

  // Lấy danh sách giống chó cho trang hiện tại
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);

  // --- LOGIC PHÂN BIỆT LỖI MẠNG ---
  const networkErrorMessage =
    'Mất kết nối Internet. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  const isNetworkError = error === networkErrorMessage;

  // --- LOGIC HIỂN THỊ ĐỂ DỄ ĐỌC HƠN ---
  // Trường hợp 1: Đang tải dữ liệu
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-xl text-indigo-600">Đang tải thông tin...</p>
      </div>
    );
  }

  // Trường hợp 2: Có lỗi xảy ra (sau khi đã tải xong)
  if (error) {
    return (
      <div
        className={`px-4 py-3 rounded relative mb-6 ${
          isNetworkError
            ? 'bg-yellow-100 border border-yellow-400 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`}
        role="alert"
      >
        <strong className="font-bold">
          {isNetworkError ? 'Cảnh báo:' : 'Lỗi:'}
        </strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  // Trường hợp 3: Không tìm thấy dữ liệu (sau khi đã tải xong và không có lỗi)
  if (breeds.length === 0) {
    return (
      <p className="text-center text-xl text-gray-600">
        Không tìm thấy dữ liệu nào. Thử làm mới hoặc kiểm tra kết nối của bạn.
      </p>
    );
  }

  // Trường hợp 4: Tải xong, không có lỗi và có dữ liệu
  return (
    <div className="container mx-auto p-4 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">
        Thông tin các giống chó
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBreeds.map(breed => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>

      <Pagination {...paginationProps} />
    </div>
  );
};

export default BreedListPresentation;
