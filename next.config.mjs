/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    images:{
        remotePatterns: [
            {
               protocol: "https",
              hostname: "raw.githubusercontent.com",//domain for the image source
            },
          ]
    }
};

export default nextConfig;
