import areaService from "../services/areaService.js";

const getAllAreas = async (req, res) => {
  const areas = await areaService.getAllAreas();
  res.json(areas);
};

export default { getAllAreas };
