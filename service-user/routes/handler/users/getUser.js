const { User } = require('../../../models');
module.exports = async (req, res) => {
  const { id } = req.params;
  const akun = await User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar'],
  });
  if (!akun) {
    return res.status(404).json({ status: 'error', message: 'Akun tidak ditemukan' });
  }
  return res.json({ status: 'success', data: akun });
};
