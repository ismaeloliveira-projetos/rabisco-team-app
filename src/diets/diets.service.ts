import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { AppRole } from '@prisma/client';

@Injectable()
export class DietsService {
  constructor(private prisma: PrismaService) {}

  async create(nutritionistId: string, createDietDto: CreateDietDto) {
    const { meals, ...dietData } = createDietDto;

    return this.prisma.studentDiet.create({
      data: {
        ...dietData,
        nutritionistId,
        meals: {
          create: meals.map((meal, index) => ({
            name: meal.name,
            time: meal.time,
            foods: meal.foods,
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
            notes: meal.notes,
            orderIndex: meal.orderIndex ?? index,
          })),
        },
      },
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        nutritionist: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        meals: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });
  }

  async findAll(userId: string, userRoles: AppRole[]) {
    const where = userRoles.includes(AppRole.master) || userRoles.includes(AppRole.collaborator)
      ? {}
      : { studentId: userId };

    return this.prisma.studentDiet.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        nutritionist: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        meals: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string, userRoles: AppRole[]) {
    const diet = await this.prisma.studentDiet.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        nutritionist: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        meals: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!diet) {
      throw new NotFoundException('Dieta não encontrada');
    }

    const canAccess =
      diet.studentId === userId ||
      diet.nutritionistId === userId ||
      userRoles.includes(AppRole.master);

    if (!canAccess) {
      throw new ForbiddenException('Você não tem permissão para ver esta dieta');
    }

    return diet;
  }

  async update(id: string, nutritionistId: string, userRoles: AppRole[], updateDietDto: UpdateDietDto) {
    const diet = await this.prisma.studentDiet.findUnique({
      where: { id },
    });

    if (!diet) {
      throw new NotFoundException('Dieta não encontrada');
    }

    if (diet.nutritionistId !== nutritionistId && !userRoles.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para editar esta dieta');
    }

    const { meals, ...dietData } = updateDietDto;

    const updateData: any = { ...dietData };

    if (meals) {
      await this.prisma.meal.deleteMany({
        where: { dietId: id },
      });

      updateData.meals = {
        create: meals.map((meal, index) => ({
          name: meal.name,
          time: meal.time,
          foods: meal.foods,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
          notes: meal.notes,
          orderIndex: meal.orderIndex ?? index,
        })),
      };
    }

    return this.prisma.studentDiet.update({
      where: { id },
      data: updateData,
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        nutritionist: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        meals: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });
  }

  async remove(id: string, nutritionistId: string, userRoles: AppRole[]) {
    const diet = await this.prisma.studentDiet.findUnique({
      where: { id },
    });

    if (!diet) {
      throw new NotFoundException('Dieta não encontrada');
    }

    if (diet.nutritionistId !== nutritionistId && !userRoles.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para excluir esta dieta');
    }

    return this.prisma.studentDiet.delete({
      where: { id },
    });
  }
}


