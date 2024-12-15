module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // Adjust if needed
      },
    ],
  },
};