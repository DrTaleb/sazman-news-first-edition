/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env :{
    SERVER_URL : "https://newsapi.deltagroup.ir",
    LOCAL_URL : "https://sazman-news.iran.liara.run"
  },
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'newsapi.deltagroup.ir',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

}

module.exports = nextConfig
