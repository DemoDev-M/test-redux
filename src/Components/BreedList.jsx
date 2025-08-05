import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from '../redux/actions/breedsActions';

// Import component con
import BreedCard from './BreedCard';
// IMPORT COMPONENT PHÂN TRANG MỚI
import Pagination from './Pagination.jsx';

const BreedList = () => {
  const dispatch = useDispatch();
  const { breeds, loading, error } = useSelector(state => state.breeds);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const breedsPerPage = 9; // Số lượng giống chó trên mỗi trang

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);

  const totalPages = Math.ceil(breeds.length / breedsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // --- UI CŨ ĐƯỢC THAY THẾ BỞI COMPONENT MỚI ---
  return (
    <div className="container mx-auto p-4 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">
        Thông tin các giống chó
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="ml-4 text-xl text-indigo-600">
            Đang tải thông tin giống chó...
          </p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Lỗi:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {!loading && !error && breeds.length === 0 && (
        <p className="text-center text-xl text-gray-600">
          Không tìm thấy giống chó nào. Thử làm mới hoặc kiểm tra kết nối của
          bạn.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBreeds.map(breed => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>

      {/* SỬ DỤNG COMPONENT PHÂN TRANG */}
      <Pagination
        breedsPerPage={breedsPerPage}
        totalBreeds={breeds.length}
        currentPage={currentPage}
        paginate={paginate}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default BreedList;
