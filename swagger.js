const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Minha API Express + TypeScript',
    description: 'Documentação automática centralizada e higienizada.',
  },
  host: 'localhost:3000',
  // 💡 O segredo está aqui: definimos globalmente o formato da multa (Penalty)
  components: {
    '@schemas': {
      PenaltySchema: {
        type: 'object',
        required: ['username', 'plate', 'reason'],
        properties: {
          username: { type: 'string', example: 'John Doe' },
          plate: { type: 'string', example: 'ABC1D23' },
          reason: { type: 'string', example: 'Speeding ticket' }
        }
      }
    }
  }
};

const outputFile = './.docs/swagger-output.json'; 
const routesEndpointsFiles = ['./src/index.ts', './src/routes/routes.ts']; 

swaggerAutogen(outputFile, routesEndpointsFiles, doc);

