import Testimonial from "../db/models/Testimonial.js";

const getTestimonials = async () => {
  return await Testimonial.findAll({
    order: [["createdAt", "DESC"]],
  });
};

export default {
  getTestimonials,
};
