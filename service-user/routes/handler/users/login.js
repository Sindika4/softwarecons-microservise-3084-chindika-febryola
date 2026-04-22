const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: 'email|empty:false',
    password: 'string|min:6',
  };

  const hasil = v.validate(req.body, schema);
  if (hasil.length) {
    return res.status(400).json({ status: 'error', message: hasil });
  }

  const akun = await User.findOne({ where: { email: req.body.email } });

  if (!akun) {
    return res.status(404).json({ status: 'error', message: 'Akun tidak ditemukan' });
  }

  const passValid = await bcrypt.compare(req.body.password, akun.password);
  if (!passValid) {
    return res.status(401).json({ status: 'error', message: 'Password salah' });
  }

  return res.json({
    status: 'success',
    data: {
      id: akun.id,
      name: akun.name,
      email: akun.email,
      role: akun.role,
      avatar: akun.avatar,
      profession: akun.profession,
    },
  });
};