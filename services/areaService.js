import Area from "../db/models/Area.js";

const getAllAreas = async () => {
  return await Area.findAll();
};

export default {
  getAllAreas,
};
