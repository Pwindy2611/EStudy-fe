/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'study4.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent.fsgn5-15.fna.fbcdn.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent.fsgn2-6.fna.fbcdn.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Add this line
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'vinadesign.vn', // Add this line
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'simg.zalopay.com.vn', // Add this line
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'th.bing.com', // Add this line
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'api.vietqr.io', // Add this line
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'vietqr.net', // Add this line
                port: '',
                pathname: '/**',
            },
        ],
    },
    /** @type {import('next').NextConfig} */
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals.push("canvas");
      }
      return config;
    },
};

export default nextConfig;
