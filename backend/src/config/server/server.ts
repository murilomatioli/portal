import swaggerDocument from '../docs/swagger.json';
import express from 'express';
import router from '../../routes';
import connectToDatabase from '../connection/connection';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const environment = process.env.NODE_ENV;

let PORT = 3000;
environment === 'production' ? (PORT = 8000) : (PORT = 3000);

const app = express();
app.use(express.json());

async function startServer() {
    try {
        await connectToDatabase();
        app.use(router);
        if(environment === 'development'){
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

startServer();
