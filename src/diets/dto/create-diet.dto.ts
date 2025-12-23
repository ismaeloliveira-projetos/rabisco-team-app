import { IsString, IsOptional, IsBoolean, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MealDto {
  @IsString()
  name: string;

  @IsString()
  time: string;

  @IsArray()
  @IsString({ each: true })
  foods: string[];

  @IsInt()
  @IsOptional()
  calories?: number;

  @IsInt()
  @IsOptional()
  protein?: number;

  @IsInt()
  @IsOptional()
  carbs?: number;

  @IsInt()
  @IsOptional()
  fat?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsInt()
  @IsOptional()
  orderIndex?: number;
}

export class CreateDietDto {
  @IsString()
  studentId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  caloriesTarget?: number;

  @IsInt()
  @IsOptional()
  proteinTarget?: number;

  @IsInt()
  @IsOptional()
  carbsTarget?: number;

  @IsInt()
  @IsOptional()
  fatTarget?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  meals: MealDto[];
}


