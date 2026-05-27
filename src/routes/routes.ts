import { Router, Request, Response } from 'express';
import { validateDTO } from '../middlewares/middleware';
import { PenaltyDTO } from '../dtos/penaltyDTO';
import { PenaltyController } from '../controllers/penaltyController';

const routes = Router();
const penaltyController = new PenaltyController();

// Endpoint para listar usuários
routes.get('/', (req: Request, res: Response) => {
    res.json([{ id: 1, nome: "João" }]);
});

// Endpoint para criar um usuário
routes.post('/', (req: Request, res: Response) => {
    const { nome } = req.body;
    res.status(201).json({ mensagem: "Usuário criado!", nome });
});

routes.post('/penalties', validateDTO(PenaltyDTO), (req, res) => {
  // 💡 Sintaxe definitiva para OpenAPI 3 no swagger-autogen:
  /*  #swagger.requestBody = {
        required: true,
        description: 'Penalty data to register',
        schema: { $ref: '#/components/schemas/PenaltySchema' }
  } */
  return penaltyController.create(req, res);
});



export default routes;