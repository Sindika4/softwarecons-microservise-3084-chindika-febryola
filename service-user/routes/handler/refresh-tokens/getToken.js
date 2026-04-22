const { RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
  const tokenParam = req.query.refresh_token;

  const cariToken = await RefreshToken.findOne({ where: { token: tokenParam } });

  if (!cariToken) {
    return res.status(400).json({ status: 'error', message: 'Token tidak valid' });
  }

  return res.json({ status: 'success', data: cariToken });
};