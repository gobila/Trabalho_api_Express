import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { PenaltyController } from './controllers/penaltyController';
import { CommumController } from './controllers/commumController';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';

const app = express();
const PORT = 3000;

// Middleware para permitir que a API entenda JSON no corpo (body) das requisições
app.use(express.json());

// 1. Registra os controllers e ativa a validação automática do class-validator
useExpressServer(app, {
    controllers: [PenaltyController, CommumController],
    validation: true,// Habilita a validação de DTOs antes de executar o controller
    // cors: true,
})

// 2. Extrai os metadados do class-validator e os converte para OpenAPI schemas
const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
});

// 3. Gera a especificação OpenAPI dinamicamente analisando os controllers
const storage = getMetadataArgsStorage();
const swaggerSpec = routingControllersToSpec(
    storage,
    {},
    {
        components: {
            schemas
        },
        info: {
            title: 'Minha API Express + TypeScript',
            description: 'Documentação Swagger dinâmica gerada via decoradores e DTOs.',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    }
)

// 4. Serve a documentação dinâmica na rota /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
