export const validateSchema = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((e) => ({
          campo: e.path[0],
          message: e.message, // só a mensagem amigável do Zod
        })),
      });
    }
    next(error);
  }
};
