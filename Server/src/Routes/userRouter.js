const express = require("express");
const userController = require("../Controllers/userController");
const formController = require("../Controllers/formController"); // Novo controlador para FormData

const router = express.Router();

// Rotas de Usuários
router.post("/CreateUser", userController.createUser);
router.get("/GetAllUsers", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Rotas de Formulário
router.post("/:id/forms", formController.createForm); // Cria dados do formulário para um usuário
router.get("/:id/forms", formController.getFormsByUser); // Busca todos os formulários de um usuário

module.exports = router;
