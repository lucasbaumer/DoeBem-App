import { z } from "zod";

z.setErrorMap((issue) => {
  switch (issue.code) {
    case "invalid_type":
      if (issue.expected === "string") {
        return { message: "Este campo deve ser uma string válida." };
      }

      if (issue.expected === "number") {
        return { message: "Este campo deve ser um número válido." };
      }

      if (issue.expected === "boolean") {
        return { message: "Este campo deve ser um valor booleano." };
      }

      return { message: "Tipo de dado inválido." };
    case "too_small":
      if (issue.minimum) {
        return {
          message:
            issue.minimum === 1
              ? "Este campo é obrigatório."
              : `Este campo deve ter pelo menos ${issue.minimum} caracteres.`,
        };
      }

      break;
    case "too_big":
      if (issue.maximum) {
        return {
          message: `Este campo não pode ter mais de ${issue.maximum} caractere(s).`,
        };
      }

      break;
    case "invalid_string":
      if (issue.validation === "email") {
        return { message: "E-mail inválido." };
      }

      return { message: "Formato inválido para este campo." };
    default:
      return { message: "Erro de validação, por favor tente novamente." };
  }
});

export { z };
