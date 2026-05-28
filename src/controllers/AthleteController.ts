import { Controller, Route, Get, Post, Body, Query, Path, Tags, Response, SuccessResponse } from "tsoa";
// import { AthleteCreate, AthleteResponse, WorkoutResponse } from "../interfaces/Athlete.interface";
import { AthleteService } from "../services/AthleteService";
import { AthleteCreate, AthleteResponse, WorkoutResponse } from "../dtos/AthleteDTO";

@Tags("Athletes")
@Route("athletes")
export class AthletesController extends Controller {
    // Instancia o service para ser usado nos métodos
    private athleteService = new AthleteService();

    @Get("/")
    public async listAthletes(
        @Query() skip: number = 0,
        @Query() limit: number = 100
    ): Promise<AthleteResponse[]> {
        return await this.athleteService.list(skip, limit);
    }

    @SuccessResponse("201", "Created")
    @Post("/")
    public async createAthlete(
        @Body() body: AthleteCreate
    ): Promise<AthleteResponse> {
        return await this.athleteService.create(body);
    }

    @Response("404", "Not Found")
    @Get("{athleteId}/workouts")
    public async listAthleteWorkouts(
        @Path() athleteId: number
    ): Promise<WorkoutResponse[]> {
        try {
            return await this.athleteService.listWorkouts(athleteId);
        } catch (error: any) {
            // Se o service jogou um erro com status, repassa para o TSOA/Express
            if (error.status) {
                this.setStatus(error.status);
            }
            throw error;
        }
    }
}
