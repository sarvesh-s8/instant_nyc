/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL:
      "mongodb+srv://Sarvesh:AdminSarvesh@cluster0.hsa9xvc.mongodb.net/instaNYC?retryWrites=true&w=majority",
    JWT_SECRET: "2345f3m5d15_W5f35",
    CLOUDINARY_NAME: "sarveshsdata",
    CLOUDINARY_API_KEY: "689875948924268",
    CLOUDINARY_API_SECRET: "0ZRkjc3DF9VbKRlFLsDiBwjs8Rw",
    MAIL_PASSWORD: "gTXs53dpFrGy7Y1U",
    MAIL_SEND: "dt9280332@gmail.com",
    PORT: 3000,
  },
};

module.exports = nextConfig;
