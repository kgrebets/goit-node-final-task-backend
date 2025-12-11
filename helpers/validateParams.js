import HttpError from "./HttpError.js";

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: false,
    });

    if (error) {
      throw HttpError(400, error.message);
    }

    Object.assign(req.params, value);

    next();
  };
};

export default validateParams;
