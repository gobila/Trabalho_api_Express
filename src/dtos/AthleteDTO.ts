// Substituto do AtletaCreate
export interface AthleteCreate {
    name: string;
    age: number;
    weight: number;
    height: number;
    goal: string;
}

// Substituto do AtletaResponse
export interface AthleteResponse {
    id: number;
    name: string;
    age: number;
    weight: number;
    height: number;
    goal: string;
}