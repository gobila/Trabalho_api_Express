import { appDataSource } from "../database";
import { WorkoutEntity } from "../entities/WorkoutEntity";
import { AthleteEntity } from "../entities/AthleteEntity";
import { WorkoutCreate, WorkoutIARequest, WorkoutResponse } from "../dtos/WorkoutDTO";
import { generateWorkoutWithAI } from "./IaService";

export class WorkoutService {
    private workoutRepository = appDataSource.getRepository(WorkoutEntity);
    private athleteRepository = appDataSource.getRepository(AthleteEntity);

    // 1. Listar treinos com paginação
    public async list(skip: number, limit: number): Promise<WorkoutResponse[]> {
        return await this.workoutRepository.find({
            skip: skip,
            take: limit
        });
    }

    // 2. Cadastrar treino manual com validação de ID do atleta
    public async create(data: WorkoutCreate): Promise<WorkoutResponse> {
        const athleteExists = await this.athleteRepository.findOneBy({ id: data.athleteId });
        
        if (!athleteExists) {
            const error = new Error(`Athlete with ID ${data.athleteId} not found.`);
            (error as any).status = 404;
            throw error;
        }

        const newWorkout = this.workoutRepository.create(data);
        return await this.workoutRepository.save(newWorkout);
    }

    // 3. Gerar treino com Inteligência Artificial
    public async createWithAI(data: WorkoutIARequest, aiProvider: string): Promise<WorkoutResponse> {
        const athlete = await this.athleteRepository.findOneBy({ id: data.athleteId });
        
        if (!athlete) {
            const error = new Error(`Athlete with ID ${data.athleteId} not found.`);
            (error as any).status = 404;
            throw error;
        }

        // 3.1 Montagem do Prompt idêntico ao Python
        const prompt = `
        Crie um treino personalizado de musculação/condicionamento para o seguinte aluno:
        - Nome: ${athlete.name}
        - Idade: ${athlete.age} anos
        - Peso: ${athlete.weight} kg
        - Altura: ${athlete.height} m
        - Objetivo: ${athlete.goal}
        - Foco do treino de hoje: ${data.workoutFocus}
        
        Por favor, retorne uma lista de exercícios com séries, repetições e breves dicas de execução. 
        Seja direto e formate em tópicos amigáveis (Markdown). Retorne apenas o treino.
        `;

        try {
            // 3.2 Chamada fictícia da sua função de IA do Node.js
            const generatedDescription = await this.generateWorkoutFromAIService(aiProvider, prompt);

            // 3.3 Salva o treino gerado
            const newAIWorkout = this.workoutRepository.create({
                name: `Workout for ${data.workoutFocus} (${aiProvider.toUpperCase()})`,
                description: generatedDescription,
                athleteId: athlete.id
            });

            return await this.workoutRepository.save(newAIWorkout);
        } catch (error: any) {
            // Repassa erros de validação da IA ou problemas de conexão interna
            const apiError = new Error(error.message || "Failed to communicate with AI service.");
            (apiError as any).status = error.status || 500;
            throw apiError;
        }
    }

    // Função interna  para gerar treino com ia
    private async generateWorkoutFromAIService(provider: string, prompt: string): Promise<string> {
        // Implemente sua chamada HTTP para OpenAI, Gemini, etc. aqui.
        return await generateWorkoutWithAI(provider, prompt);
    }
}
