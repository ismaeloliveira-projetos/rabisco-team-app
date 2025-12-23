import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AppRole } from '@prisma/client';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(AppRole.master, AppRole.collaborator)
  create(@CurrentUser() user: any, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(user.id, createWorkoutDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.workoutsService.findAll(user.id, user.roles);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workoutsService.findOne(id, user.id, user.roles);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(AppRole.master, AppRole.collaborator)
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.update(id, user.id, user.roles, updateWorkoutDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(AppRole.master, AppRole.collaborator)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workoutsService.remove(id, user.id, user.roles);
  }
}


