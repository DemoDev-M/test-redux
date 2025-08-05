/* eslint-disable react/prop-types */
// src/components/Pagination.jsx

import React from 'react';

const Pagination = ({
  breedsPerPage,
  totalBreeds,
  currentPage,
  paginate,
  handlePreviousPage,
  handleNextPage,
}) => {
  // Tính tổng số trang
  const totalPages = Math.ceil(totalBreeds / breedsPerPage);

  // Tạo mảng các số trang
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Nếu chỉ có một trang hoặc không có dữ liệu, không hiển thị phân trang
  if (totalPages <= 1 || totalBreeds === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Nút 'Trang trước' */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          currentPage === 1
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-indigo-500 text-white hover:bg-indigo-600'
        }`}
      >
        Trang trước
      </button>

      {/* Các nút số trang */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
            currentPage === number
              ? 'bg-indigo-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {number}
        </button>
      ))}

      {/* Nút 'Trang sau' */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-indigo-500 hover:bg-indigo-600'
        }`}
      >
        Trang sau
      </button>
    </div>
  );
};

export default Pagination;
