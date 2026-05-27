import { appDataSource } from '../database';
import { Penalty } from '../entities/penaltyEntity';
import { PenaltyDTO } from '../dtos/penaltyDTO';
import crypto from 'crypto';

export class PenaltyService {
  // Pega o repositório do TypeORM para manipular a tabela Penalty
  private repository = appDataSource.getRepository(Penalty);

  // 1. Cria/Salva uma nova multa
  public async create(data: PenaltyDTO) {
    const penalty = this.repository.create({
      id: data.id || crypto.randomUUID(),
      username: data.username,
      plate: data.plate,
      reason: data.reason,
      createdAt: data.createdAt || new Date(),
    });

    return await this.repository.save(penalty);
  }

  // 2. Busca todas as multas
  public async findAll() {
    return await this.repository.find();
  }

  // 3. Busca por ID único
  public async findById(id: string) {
    return await this.repository.findOneBy({ id });
  }

  // 4. Atualiza os dados de uma multa
  public async update(id: string, data: Partial<PenaltyDTO>) {
    await this.repository.update(id, {
      username: data.username,
      plate: data.plate,
      reason: data.reason,
    });
    return this.findById(id);
  }

  // 5. Remove do banco
  public async delete(id: string) {
    await this.repository.delete(id);
    return { id, deleted: true };
  }
}
