// middleware/validateCpf.js
import { cpf as CPFValidator } from "cpf-cnpj-validator";

const validateCPF = (req, res, next) => {
  let cpf = "";

  if (req.body && req.body.cpf) {
    cpf = req.body.cpf;
  } else if (req.query && req.query.cpf) {
    cpf = req.query.cpf;
  }

  if (!cpf) {
    return res.status(400).json({ error: "CPF is required" });
  }

  if (!CPFValidator.isValid(cpf)) {
    return res.status(400).json({ error: "Invalid CPF" });
  }

  next();
};

export default validateCPF;
