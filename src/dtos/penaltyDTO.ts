import { IsString, IsNotEmpty, Length, IsOptional, IsDate } from 'class-validator';

export interface IPenalty {
  id?: string;
  username: string;
  plate: string;
  reason: string;
  createdAt?: Date;
}

export class PenaltyDTO implements IPenalty {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString({ message: 'Username must be a valid string' })
  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @IsString({ message: 'Plate must be a valid string' })
  @Length(7, 7, { message: 'Plate must be exactly 7 characters long' })
  plate!: string;

  @IsString({ message: 'Reason must be a valid string' })
  @IsNotEmpty({ message: 'Reason is required' })
  reason!: string;

  @IsDate({ message: 'CreatedAt must be a valid Date object' })
  @IsOptional()
  createdAt?: Date;
}
