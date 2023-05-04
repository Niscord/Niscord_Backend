const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Niscord Backend",
      version: "1.0.0",
      description: "API Documentation for Niscord Backend",
    },
    servers: [
      {
        url: `http://localhost:1357`,
      },
    ],
  },
  apis: ['./src/server/route/*/*.js'],
}

export default options;