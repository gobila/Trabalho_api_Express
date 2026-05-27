import { Request, Response } from "express"
import { PenaltyDTO } from "../dtos/penaltyDTO"
import crypto from 'crypto'; // Usando o módulo nativo do Node para IDs seguros
import { PenaltyService } from '../services/penaltyService';

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


  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dto: PenaltyDTO = req.body;
      const createdPenalty = await this.penaltyService.create(dto);

      return res.status(201).json({
        message: 'Penalty registered successfully in the database!',
        data: createdPenalty
      });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error saving penalty', error: error.message });
    }
  };
}