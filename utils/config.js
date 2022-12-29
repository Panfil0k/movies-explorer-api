const {
  PORT = 3000,
  DATA_BASE = 'mongodb://localhost:27017/bitfilmsdb',
  NODE_ENV,
  JWT_SECRET,
  KEY_SECRET = 'dev-secret-key',
  SALT = 10,
} = process.env;

module.exports = {
  PORT, DATA_BASE, NODE_ENV, JWT_SECRET, KEY_SECRET, SALT,
};
