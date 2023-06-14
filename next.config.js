/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env :{
    SERVER_URL : "http://newsapi.deltagroup.ir",
    LOCAL_URL : "https://sazman-news.iran.liara.run"
  }
}

module.exports = nextConfig
