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
        url: `http://localhost:9091`,
      },
    ],
  },
  apis: ['./src/server/route/*/*.js', './swagger/*.yml'],
}

export default options;