// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Đảm bảo plugin react được gọi đúng cách
    react({
      // Thêm tùy chọn này để xử lý các file .js như JSX
      // Đây là cách đúng để Vite/esbuild xử lý JSX trong .js
      jsxRuntime: 'automatic', // Hoặc 'classic' tùy thuộc vào cài đặt của bạn
      // Nếu bạn có các file .js chứa JSX, hãy đảm bảo chúng được bao gồm
      // Ví dụ: nếu bạn có các file .js trong src/components/ mà chứa JSX
      // Bạn có thể không cần tùy chọn này nếu plugin react đã xử lý mặc định
      // Nhưng nếu vẫn lỗi, đây là nơi bạn có thể tùy chỉnh
    }),
  ],
  // Xóa phần esbuild: {} mà bạn đã thêm trước đó
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx',
  //   } as const,
  // },
  // Nếu bạn đang dùng TypeScript, phần resolve này có thể hữu ích
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
