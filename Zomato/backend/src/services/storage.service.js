const Imagekit = require('@imagekit/nodejs');

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {

  const result = await imagekit.files.upload({
    file: file.toString("base64"),
    fileName: fileName
  });

  return result;
}

module.exports = {
  uploadFile,
};