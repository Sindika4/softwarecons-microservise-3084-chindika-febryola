const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6',
    profession: 'string|optional',
  };

  const hasil = v.validate(req.body, schema);
  if (hasil.length) {
    return res.status(400).json({ status: 'error', message: hasil });
  }

  try {
    const passHash = await bcrypt.hash(req.body.password, 10);

    const dataBaru = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: passHash,
      profession: req.body.profession,
    });

    return res.json({
      status: 'success',
      data: {
        id: dataBaru.id,
        name: dataBaru.name,
        email: dataBaru.email,
        profession: dataBaru.profession,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};