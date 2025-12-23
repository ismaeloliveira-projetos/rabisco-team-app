import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkoutExerciseDto {
  @IsString()
  exerciseId: string;

  @IsString()
  reps: string;

  @IsString()
  sets: string;

  @IsString()
  @IsOptional()
  restSeconds?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  orderIndex?: string;
}

export class CreateWorkoutDto {
  @IsString()
  studentId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDto)
  exercises: WorkoutExerciseDto[];
}

