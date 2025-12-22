import HttpError from "./HttpError.js";

const parseIngredients = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (!Array.isArray(parsed)) {
        throw new Error();
      }

      return parsed;
    } catch {
      throw HttpError(400, "ingredients must be a valid JSON array");
    }
  }

  throw HttpError(400, "ingredients is required");
};

export default parseIngredients;
