import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AppRole } from '@prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async create(trainerId: string, createWorkoutDto: CreateWorkoutDto) {
    const { exercises, ...workoutData } = createWorkoutDto;

    return this.prisma.studentWorkout.create({
      data: {
        ...workoutData,
        trainerId,
        exercises: {
          create: exercises.map((ex, index) => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            restSeconds: ex.restSeconds ?? null,
            notes: ex.notes,
            orderIndex: ex.orderIndex ?? index,
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
        trainer: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        exercises: {
          include: {
            exercise: {
              include: {
                category: true,
              },
            },
          },
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

    return this.prisma.studentWorkout.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        trainer: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        exercises: {
          include: {
            exercise: {
              include: {
                category: true,
              },
            },
          },
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
    const workout = await this.prisma.studentWorkout.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        trainer: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        exercises: {
          include: {
            exercise: {
              include: {
                category: true,
              },
            },
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!workout) {
      throw new NotFoundException('Treino não encontrado');
    }

    const canAccess =
      workout.studentId === userId ||
      workout.trainerId === userId ||
      userRoles.includes(AppRole.master);

    if (!canAccess) {
      throw new ForbiddenException('Você não tem permissão para ver este treino');
    }

    return workout;
  }

  async update(id: string, trainerId: string, userRoles: AppRole[], updateWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.prisma.studentWorkout.findUnique({
      where: { id },
    });

    if (!workout) {
      throw new NotFoundException('Treino não encontrado');
    }

    if (workout.trainerId !== trainerId && !userRoles.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para editar este treino');
    }

    const { exercises, ...workoutData } = updateWorkoutDto;

    const updateData: any = { ...workoutData };

    if (exercises) {
      await this.prisma.workoutExercise.deleteMany({
        where: { workoutId: id },
      });

      updateData.exercises = {
        create: exercises.map((ex, index) => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          restSeconds: ex.restSeconds ?? null,
          notes: ex.notes,
          orderIndex: ex.orderIndex ?? index,
        })),
      };
    }

    return this.prisma.studentWorkout.update({
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
        trainer: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        exercises: {
          include: {
            exercise: {
              include: {
                category: true,
              },
            },
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });
  }

  async remove(id: string, trainerId: string, userRoles: AppRole[]) {
    const workout = await this.prisma.studentWorkout.findUnique({
      where: { id },
    });

    if (!workout) {
      throw new NotFoundException('Treino não encontrado');
    }

    if (workout.trainerId !== trainerId && !userRoles.includes(AppRole.master)) {
      throw new ForbiddenException('Você não tem permissão para excluir este treino');
    }

    return this.prisma.studentWorkout.delete({
      where: { id },
    });
  }
}

