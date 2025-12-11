import testimonialService from "../services/testimonialService.js";

export const getTestimonials = async (req, res) => {
  const list = await testimonialService.getTestimonials();
  res.status(200).json(list);
};

export default {
  getTestimonials,
};
