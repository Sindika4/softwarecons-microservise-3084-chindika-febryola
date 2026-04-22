const { User, RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
  const targetId = req.body.user_id;

  const akun = await User.findByPk(targetId);
  if (!akun) {
    return res.status(404).json({ status: 'error', message: 'Akun tidak ditemukan' });
  }

  await RefreshToken.destroy({ where: { user_id: targetId } });

  return res.json({ status: 'success', message: 'Berhasil logout' });
};