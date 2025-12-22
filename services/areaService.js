import Area from "../db/models/Area.js";

const getAllAreas = async () => {
  return await Area.findAll({
    order: [["name", "ASC"]],
  });
};

export default {
  getAllAreas,
};
