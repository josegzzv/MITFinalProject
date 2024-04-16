import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'; // Provee un valor por defecto como fallback

export const encryptData = (data) => {
  if (!data) {
    console.log("encryptData: No data provided");
    return null;
  }
  
  if (!SECRET_KEY) {
    console.log("encryptData: SECRET_KEY is not defined");
    return null;
  }

  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return ciphertext;
  } catch (error) {
    console.log("Error encrypting data:", error);
    return null; 
  }
};

export const decryptData = (ciphertext) => {

  if (!ciphertext) {
    console.log("decryptData: No ciphertext provided");
    return null;
  }

  if (!SECRET_KEY) {
    console.log("decryptData: SECRET_KEY is not defined");
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.log("Error decrypting data:", error);
    return null; 
  }
};
