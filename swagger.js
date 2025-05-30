// swagger.js
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'StudySync API',
    description: 'StudySync API Documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './src/index.js',
  './src/routers/auth.router.js',
  './src/routers/user.router.js',
  './src/routers/group.router.js',
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);