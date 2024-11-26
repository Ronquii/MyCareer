const prisma = require("../Model/PrismaClient");

module.exports = {
  createForm: async (req, res) => {
    const { id } = req.params; // ID do usuário
    const { telefone, cargo, area, preferenciaHorario, desafios, consultoria } = req.body;

    try {
      const formData = await prisma.formData.create({
        data: {
          telefone,
          cargo,
          area,
          preferenciaHorario,
          desafios,
          consultoria,
          userId: id,
        },
      });
      res.status(201).json({ message: "Form data created successfully", formData });
    } catch (error) {
      res.status(500).json({ error: "Error creating form data", details: error.message });
    }
  },

  getFormsByUser: async (req, res) => {
    const { id } = req.params; // ID do usuário

    try {
      const forms = await prisma.formData.findMany({
        where: { userId: id }, select : {
          area : true,
          cargo : true,
          consultoria : true,
          createdAt : true,
          desafios : true,
          id : true, 
          preferenciaHorario : true,
          telefone : true,
          user : true,
          userId : true
        }
      });
      res.status(200).json({ forms });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving forms", details: error.message });
    }
  },
};
