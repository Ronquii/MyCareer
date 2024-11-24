const prisma = require("../Model/PrismaClient");
const bcrypt = require("bcrypt");

const createUser = async (data) => {
  const today = new Date();
  const dateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  data.createdAt = dateOnly;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  return prisma.user.create({ data });
};

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id: id.toString() } });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id: parseInt(id, 10) },
    data,
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id: parseInt(id, 10) } });
};

const findUserByNameOrEmail = async (identifier) => {
  // Busca o usuário pelo nome ou email
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ name: identifier }, { email: identifier }],
    },
  });

  // Retorna o usuário ou null
  return user;
};

const getUSerByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByNameOrEmail,
  getUSerByEmail,
};
