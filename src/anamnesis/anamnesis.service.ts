import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';
import { AppRole } from '@prisma/client';

@Injectable()
export class AnamnesisService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAnamnesisDto: CreateAnamnesisDto) {
    return this.prisma.anamnesis.upsert({
      where: { userId },
      update: createAnamnesisDto,
      create: {
        userId,
        ...createAnamnesisDto,
      },
    });
  }

  async findOne(userId: string, requestUserId: string, userRoles: AppRole[]) {
    const canAccess = userId === requestUserId || userRoles.includes(AppRole.master) || userRoles.includes(AppRole.collaborator);

    if (!canAccess) {
      throw new ForbiddenException('Você não tem permissão para ver esta anamnese');
    }

    const anamnesis = await this.prisma.anamnesis.findUnique({
      where: { userId },
    });

    if (!anamnesis) {
      throw new NotFoundException('Anamnese não encontrada');
    }

    return anamnesis;
  }

  async update(userId: string, requestUserId: string, userRoles: AppRole[], updateAnamnesisDto: UpdateAnamnesisDto) {
    const canAccess = userId === requestUserId || userRoles.includes(AppRole.master) || userRoles.includes(AppRole.collaborator);

    if (!canAccess) {
      throw new ForbiddenException('Você não tem permissão para editar esta anamnese');
    }

    const anamnesis = await this.prisma.anamnesis.findUnique({
      where: { userId },
    });

    if (!anamnesis) {
      throw new NotFoundException('Anamnese não encontrada');
    }

    return this.prisma.anamnesis.update({
      where: { userId },
      data: updateAnamnesisDto,
    });
  }
}


