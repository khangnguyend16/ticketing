export default {
  webpack: (config) => {
    return {
      ...config, // giữ nguyên mọi setting cũ
      watchOptions: {
        ...config.watchOptions,
        poll: 300, // Webpack sẽ dùng polling để kiểm tra thay đổi file mỗi 300ms
      },
    };
  },
  allowedDevOrigins: ["ticketing.dev"],
};
