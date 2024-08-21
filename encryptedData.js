const crypto = require('crypto');

const encryptData = (data) => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
};

module.exports = encryptData;
