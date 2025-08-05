/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// Component hiển thị thông tin chi tiết của một giống chó
// eslint-disable-next-line react/prop-types
const BreedCard = ({ breed }) => {
  // Thêm kiểm tra nếu breed là null/undefined, không render gì hoặc hiển thị lỗi
  if (!breed) {
    console.warn('BreedCard received an undefined or null breed prop.');
    return null; // Hoặc bạn có thể trả về một placeholder div
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Sử dụng optional chaining (?.) để truy cập thuộc tính 'name' */}
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">
          {breed.name}
        </h2>
        {/* Sử dụng optional chaining cho description */}
        <p className="text-gray-700 mb-4 text-sm">
          {breed.description || 'Không có mô tả.'}
        </p>
        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-semibold">Tuổi thọ:</span> {breed.life?.min}
            {breed.life?.max} năm
          </p>
          <p>
            <span className="font-semibold">Cân nặng đực:</span>
            {breed.maleWeight?.min} - {breed.maleWeight?.max} kg
          </p>
          <p>
            <span className="font-semibold">Cân nặng cái:</span>
            {breed.femaleWeight?.min} - {breed.femaleWeight?.max} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
