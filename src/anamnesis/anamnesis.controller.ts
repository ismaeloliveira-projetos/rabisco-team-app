import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('anamnesis')
@UseGuards(JwtAuthGuard)
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() createAnamnesisDto: CreateAnamnesisDto) {
    return this.anamnesisService.create(user.id, createAnamnesisDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string, @CurrentUser() user: any) {
    return this.anamnesisService.findOne(userId, user.id, user.roles);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @CurrentUser() user: any,
    @Body() updateAnamnesisDto: UpdateAnamnesisDto,
  ) {
    return this.anamnesisService.update(userId, user.id, user.roles, updateAnamnesisDto);
  }
}


