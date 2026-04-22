const { User, RefreshToken } = require('../../../models');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    refresh_token: 'string',
    user_id: 'number',
  };

  const hasil = v.validate(req.body, schema);
  if (hasil.length) {
    return res.status(400).json({ status: 'error', message: hasil });
  }

  try {
    const { user_id, refresh_token } = req.body;

    const akun = await User.findByPk(user_id);
    if (!akun) {
      return res.status(404).json({ status: 'error', message: 'Akun tidak ditemukan' });
    }

    const tokenBaru = await RefreshToken.create({ token: refresh_token, user_id: akun.id });

    return res.json({ status: 'success', data: { id: tokenBaru.id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server' });
  }
};