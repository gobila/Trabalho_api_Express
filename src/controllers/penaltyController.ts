import { Request, Response } from "express"
import { PenaltyDTO } from "../dtos/penaltyDTO"
import crypto from 'crypto'; // Usando o módulo nativo do Node para IDs seguros
import { PenaltyService } from '../services/penaltyService';
import { Body, HttpCode, JsonController, Post } from "routing-controllers";

@JsonController('/penalties')
export class PenaltyController {
  private penaltyService: PenaltyService;

  constructor() {
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

  // Dessa forma o try/cath nao se faz necessário,o partner routing-controllers + class-validator faz isso
  @Post('/')
  @HttpCode(201) // Define o status HTTP de sucesso como 201 Created
  public async create(@Body() request: PenaltyDTO) {
    const createdPenalty = await this.penaltyService.create(request);

    return {
      message: 'Penalty registered successfully in the database!',
      data: createdPenalty
    };
  };
}