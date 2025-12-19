import Testimonial from "../db/models/Testimonial.js";
import { User } from "../db/models/index.js";

const getTestimonials = async () => {
  return await Testimonial.findAll({
    include: [
      { model: User, attributes: ["username"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export default {
  getTestimonials,
};
