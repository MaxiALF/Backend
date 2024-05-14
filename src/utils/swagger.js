import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "MAX POWER PARTS API",
      description: "Documentation of API",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default options;
