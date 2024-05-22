// swaggerConfig.js
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "Documentation for my Express API",
      contact: {
        name: "Leonardo and Robert",
        email: "leonardo10sp@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/presentation/http/routes/*/*.ts", "./src/domain/*/*.ts"], // Path to your API route files
};

const specs = swaggerJsdoc(swaggerOptions);

export default specs;
