// src/components/BreedList.js

import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from '../redux/actions/breedsActions'; // Import action creator

// Import component con
import BreedCard from './BreedCard';

// Component danh sách các giống chó, kết nối với Redux store
const BreedList = () => {
  const dispatch = useDispatch();
  // Lấy dữ liệu breeds, loading, error từ Redux store
  const { breeds, loading, error } = useSelector(state => state.breeds);

  // Gọi API khi component được mount
  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]); // Đảm bảo hiệu ứng chỉ chạy một lần khi component mount

  return (
    <div className="container mx-auto p-4 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">
        Thông tin các giống chó
      </h1>

      {/* Hiển thị trạng thái tải */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="ml-4 text-xl text-indigo-600">
            Đang tải thông tin giống chó...
          </p>
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Lỗi:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {/* Hiển thị thông báo khi không tìm thấy dữ liệu và không có lỗi/đang tải */}
      {!loading && !error && breeds.length === 0 && (
        <p className="text-center text-xl text-gray-600">
          Không tìm thấy giống chó nào. Thử làm mới hoặc kiểm tra kết nối của
          bạn.
        </p>
      )}

      {/* Hiển thị danh sách các giống chó */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds.map(breed => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
};

export default BreedList;
