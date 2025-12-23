import { IsString, IsArray, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  instructions?: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string;

  @IsArray()
  @IsString({ each: true })
  muscleGroups: string[];

  @IsArray()
  @IsString({ each: true })
  equipment: string[];

  @IsString()
  difficulty: string;

  @IsString()
  categoryId: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}


