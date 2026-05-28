// Importa exatamente o mesmo appDataSource que você usou no PenaltyService
import { appDataSource } from '../database';
import { AthleteCreate, AthleteResponse } from '../dtos/AthleteDTO';
import { WorkoutResponse } from '../dtos/WorkoutDTO';
import { AthleteEntity } from '../entities/AthleteEntity';

export class AthleteService {
  // Pega o repositório do TypeORM usando a sua instância existente
  private repository = appDataSource.getRepository(AthleteEntity);

  // 1. Listar atletas com paginação
  public async list(skip: number, limit: number): Promise<AthleteResponse[]> {
    return await this.repository.find({
      skip: skip,
      take: limit
    });
  }

  // 2. Cadastrar novo atleta
  public async create(data: AthleteCreate): Promise<AthleteResponse> {
    const newAthlete = this.repository.create(data);
    return await this.repository.save(newAthlete);
  }

  // 3. Listar treinos de um atleta específico
// Substituto correto com o formato de objeto
public async listWorkouts(athleteId: number): Promise<WorkoutResponse[]> {
    const athlete = await this.repository.findOne({
        where: { id: athleteId },
        relations: {
            workouts: true // Ativa o relacionamento usando formato de objeto booleano
        }
    });

    if (!athlete) {
        const error = new Error(`Athlete with ID ${athleteId} not found.`);
        (error as any).status = 404;
        throw error;
    }

    return athlete.workouts;
}
}
