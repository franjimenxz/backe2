import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Ecommerce",
      description: "Ecommerce documentation",
      version: "0.0.1",
    },
  },
  apis: [`docs/**/*.yaml`],
};

export default swaggerJsDoc(swaggerOptions);
