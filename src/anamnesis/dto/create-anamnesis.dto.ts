import { IsString, IsOptional, IsInt, IsFloat, IsArray } from 'class-validator';

export class CreateAnamnesisDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsString()
  @IsOptional()
  routineType?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsInt()
  @IsOptional()
  trainingFrequency?: number;

  @IsInt()
  @IsOptional()
  sleepHours?: number;

  @IsInt()
  @IsOptional()
  mealsPerDay?: number;

  @IsFloat()
  @IsOptional()
  weight?: number;

  @IsFloat()
  @IsOptional()
  height?: number;

  @IsInt()
  @IsOptional()
  waterIntake?: number;

  @IsString()
  @IsOptional()
  primaryGoal?: string;

  @IsString()
  @IsOptional()
  experienceLevel?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  secondaryGoals?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  healthConditions?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allergies?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  dietRestrictions?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  availableEquipment?: string[];

  @IsString()
  @IsOptional()
  foodPreferences?: string;

  @IsString()
  @IsOptional()
  injuries?: string;

  @IsString()
  @IsOptional()
  medications?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}


