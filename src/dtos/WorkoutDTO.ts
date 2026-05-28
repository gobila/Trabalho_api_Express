export interface WorkoutCreate {
    name: string;
    description: string;
    athleteId: number;
}

export interface WorkoutIARequest {
    athleteId: number;
    workoutFocus: string; // Equivalente a foco_treino
}

export interface WorkoutResponse {
    id: number;
    name: string;
    description: string;
    athleteId: number;
}
