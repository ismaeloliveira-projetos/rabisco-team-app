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
import { DietsService } from './diets.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AppRole } from '@prisma/client';

@Controller('diets')
@UseGuards(JwtAuthGuard)
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(AppRole.master, AppRole.collaborator)
  create(@CurrentUser() user: any, @Body() createDietDto: CreateDietDto) {
    return this.dietsService.create(user.id, createDietDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.dietsService.findAll(user.id, user.roles);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.dietsService.findOne(id, user.id, user.roles);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(AppRole.master, AppRole.collaborator)
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateDietDto: UpdateDietDto,
  ) {
    return this.dietsService.update(id, user.id, user.roles, updateDietDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(AppRole.master, AppRole.collaborator)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.dietsService.remove(id, user.id, user.roles);
  }
}


