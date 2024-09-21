import CryptoJS from 'crypto-js';

const getGravatarUrl = (email) => {
  const hashedEmail = CryptoJS.SHA256(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
  return `https://www.gravatar.com/avatar/${hashedEmail}`;
};

export default getGravatarUrl;
