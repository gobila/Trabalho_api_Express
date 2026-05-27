import { Controller, Route, Post, Body, SuccessResponse, Response } from 'tsoa';
import { PenaltyDTO } from "../dtos/penaltyDTO"
import crypto from 'crypto'; // Usando o módulo nativo do Node para IDs seguros
import { PenaltyService } from '../services/penaltyService';


// Define a rota base /penalties
// nao precisa de / na definicao
@Route('penalties')
export class PenaltyController extends Controller {
  private penaltyService: PenaltyService;

  constructor() {
    super();
    this.penaltyService = new PenaltyService();
  }

  // public create = async (req: Request, res: Response): Response => {
  //     const newPenalty: PenaltyDTO = req.body;

  //     // TODO: trocar por uuid
  //     // newPenalty.id = newPenalty.id || crypto.randomUUID();
  //     newPenalty.id = newPenalty.id || Math.random().toString(36).substring(2,9);
  //     newPenalty.createdAt = newPenalty.createdAt || new Date();

  //     return res.status(201).json({
  //         message: 'Penalty registered successfully!',
  //         data: newPenalty
  //     })
  // }

  @Post('/')
  @SuccessResponse(201, 'Penalty registered successfully in the database!')
  @Response(400, 'Bad Request')
  public async create(@Body() request: PenaltyDTO) {
    const createdPenalty = await this.penaltyService.create(request);

    // Define o status de sucesso 201 no TSOA
    this.setStatus(201);

    return {
      message: 'Penalty registered successfully in the database!',
      data: createdPenalty
    };
  };
}