import { Controller, Route, Get, Post, Body, Query, Header, Tags, Response, SuccessResponse } from "tsoa";
import { WorkoutService } from "../services/WorkoutService";
import { WorkoutCreate, WorkoutIARequest, WorkoutResponse } from "../dtos/WorkoutDTO";

@Tags("Workouts")
@Route("workouts")
export class WorkoutsController extends Controller {
    private workoutService = new WorkoutService();

    @Get("/")
    public async listWorkouts(
        @Query() skip: number = 0,
        @Query() limit: number = 100
    ): Promise<WorkoutResponse[]> {
        return await this.workoutService.list(skip, limit);
    }

    @SuccessResponse("201", "Created")
    @Response("404", "Athlete Not Found")
    @Post("/")
    public async createWorkout(
        @Body() body: WorkoutCreate
    ): Promise<WorkoutResponse> {
        try {
            return await this.workoutService.create(body);
        } catch (error: any) {
            if (error.status) this.setStatus(error.status);
            throw error;
        }
    }

    @SuccessResponse("201", "Created with AI")
    @Response("404", "Athlete Not Found")
    @Response("400", "Bad Request")
    @Post("generate-with-ai")
    public async createWorkoutWithAI(
        @Body() body: WorkoutIARequest,
        @Header("x-ai-provider") xAiProvider: string // Captura o Header obrigatoriamente
    ): Promise<WorkoutResponse> {
        try {
            return await this.workoutService.createWithAI(body, xAiProvider);
        } catch (error: any) {
            if (error.status) this.setStatus(error.status);
            throw error;
        }
    }
}
