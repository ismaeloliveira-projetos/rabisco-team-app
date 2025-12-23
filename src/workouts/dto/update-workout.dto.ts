import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkoutExerciseDto {
  @IsString()
  exerciseId: string;

  @IsString()
  reps: string;

  @IsInt()
  sets: number;

  @IsInt()
  @IsOptional()
  restSeconds?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsInt()
  @IsOptional()
  orderIndex?: number;
}

export class UpdateWorkoutDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDto)
  @IsOptional()
  exercises?: WorkoutExerciseDto[];
}

