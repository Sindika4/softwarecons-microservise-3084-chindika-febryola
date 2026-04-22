const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6|optional',
    profession: 'string|optional',
    avatar: 'string|optional',
  };
  const hasil = v.validate(req.body, schema);
  if (hasil.length) {
    return res.status(400).json({ status: 'error', message: hasil });
  }
  const { id } = req.params;
  const akun = await User.findByPk(id);
  if (!akun) {
    return res.status(404).json({ status: 'error', message: 'Akun tidak ditemukan' });
  }
  const { email, name, profession, avatar } = req.body;
  if (email && email !== akun.email) {
    const cekEmail = await User.findOne({ where: { email } });
    if (cekEmail) {
      return res.status(409).json({ status: 'error', message: 'Email sudah dipakai' });
    }
  }
  let passFinal = akun.password;
  if (req.body.password) {
    passFinal = await bcrypt.hash(req.body.password, 10);
  }
  await akun.update({ email, password: passFinal, name, profession, avatar });
  return res.json({
    status: 'success',
    data: { id: akun.id, email, name, profession, avatar },
  });
};
