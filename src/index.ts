import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes'; // Este arquivo será gerado automaticamente pelo TSOA
import swaggerDocument from '../.docs/swagger.json'; // Este JSON também será gerado automaticamente


const app = express();
const PORT = 3000;

// Middleware para permitir que a API entenda JSON no corpo (body) das requisições
app.use(express.json());

// 1. Registra as rotas geradas dinamicamente pelo TSOA
RegisterRoutes(app);

// 2. Serve a documentação na rota /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
