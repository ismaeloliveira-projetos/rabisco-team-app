import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AppRole } from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: {
        ...createExerciseDto,
        createdById: userId,
      },
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(includePrivate = false) {
    const where = includePrivate ? {} : { isPublic: true };

    return this.prisma.exercise.findMany({
      where,
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId?: string, userRoles?: AppRole[]) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException('Exercício não encontrado');
    }

    if (!exercise.isPublic && exercise.createdById !== userId && !userRoles?.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para ver este exercício');
    }

    return exercise;
  }

  async update(id: string, userId: string, userRoles: AppRole[], updateExerciseDto: UpdateExerciseDto) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException('Exercício não encontrado');
    }

    if (exercise.createdById !== userId && !userRoles.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para editar este exercício');
    }

    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, userRoles: AppRole[]) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException('Exercício não encontrado');
    }

    if (exercise.createdById !== userId && !userRoles.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para excluir este exercício');
    }

    return this.prisma.exercise.delete({
      where: { id },
    });
  }

  async getCategories() {
    return this.prisma.exerciseCategory.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}


