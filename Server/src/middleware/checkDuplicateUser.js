const userService = require('../Services/userService');

const checkDuplicateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Verifica se já existe um usuário com o mesmo nome ou email
    const existingUser = await userService.findUserByNameOrEmail(name) || 
                         await userService.findUserByNameOrEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Usuario ja existe com esse email ou senha.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkDuplicateUser;
