import HttpError from "./HttpError.js";

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: false,
    });

    if (error) {
      throw HttpError(400, error.message);
    }

    Object.assign(req.query, value);

    next();
  };
};

export default validateQuery;
