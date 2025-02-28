import express from 'express';
import router from '../../routes';
import connectToDatabase from '../connection/connection';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api', router);

async function startServer() {
    try {
        await connectToDatabase(); // Chama a função de conexão

        app.use('/api', router); // Use suas rotas

        app.listen(PORT, () => {
            console.log(process.env.MONGO_HOST);
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

startServer();
