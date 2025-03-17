import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json'; // Arquivo gerado
const endpointsFiles = ['./src/routes/index.ts']; // Arquivo principal de rotas

const doc = {
    info: {
        title: 'Portal Ilha Conectada',
        version: '1.0.0',
        description: 'Documentação da API usando Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger docs gerado com sucesso!');
    import('../server/server');
});
