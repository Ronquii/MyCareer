const userService = require('../Services/userService');

const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    

    // Verifica se o usuário existe
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'nenhum usuario atrelado a esse id' });
    }

    next(); // Continua para o próximo middleware ou controller
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkUserId;