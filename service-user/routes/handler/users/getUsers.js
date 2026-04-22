const { User } = require('../../../models');
module.exports = async (req, res) => {
  const daftarId = req.query.user_ids || [];
  const opsi = {
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar'],
  };
  if (daftarId.length) {
    opsi.where = { id: daftarId };
  }
  const daftarUser = await User.findAll(opsi);
  return res.json({ status: 'success', data: daftarUser });
};
