import 'reflect-metadata'; 
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../.docs/swagger-output.json'; 
import routes from './routes/routes';

const app = express();
const PORT = 3000;

// Middleware para permitir que a API entenda JSON no corpo (body) das requisições
app.use(express.json());

app.use(routes)

// Rota GET (Leitura)
app.get('/', (req, res) => {
    res.json({ mensagem: "Bem-vindo à minha API com Express!" });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
