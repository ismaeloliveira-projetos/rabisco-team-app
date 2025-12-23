import { PrismaClient, AppRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@rabisco.com' },
    update: {},
    create: {
      email: 'admin@rabisco.com',
      password: hashedPassword,
      roles: {
        create: {
          role: AppRole.master,
        },
      },
    },
    include: {
      roles: true,
    },
  });

  console.log(`✅ Usuário admin criado: ${adminUser.email}`);

  const categories = [
    {
      name: 'Peito',
      description: 'Exercícios para desenvolvimento do peitoral',
      icon: '💪',
    },
    {
      name: 'Costas',
      description: 'Exercícios para desenvolvimento das costas',
      icon: '🏋️',
    },
    {
      name: 'Pernas',
      description: 'Exercícios para desenvolvimento das pernas',
      icon: '🦵',
    },
    {
      name: 'Braços',
      description: 'Exercícios para desenvolvimento dos braços',
      icon: '💪',
    },
    {
      name: 'Ombro',
      description: 'Exercícios para desenvolvimento dos ombros',
      icon: '🤸',
    },
    {
      name: 'Abdômen',
      description: 'Exercícios para desenvolvimento do abdômen',
      icon: '🔥',
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.exerciseCategory.upsert({
        where: { name: cat.name },
        update: {},
        create: cat,
      }),
    ),
  );

  console.log(`✅ Criadas ${createdCategories.length} categorias`);

  const peitoCategory = createdCategories.find((c) => c.name === 'Peito');
  const costasCategory = createdCategories.find((c) => c.name === 'Costas');
  const pernasCategory = createdCategories.find((c) => c.name === 'Pernas');
  const bracosCategory = createdCategories.find((c) => c.name === 'Braços');
  const ombroCategory = createdCategories.find((c) => c.name === 'Ombro');
  const abdomenCategory = createdCategories.find((c) => c.name === 'Abdômen');

  const exercises = [
    {
      name: 'Supino Reto com Barra',
      description: 'Exercício fundamental para desenvolvimento do peitoral',
      instructions:
        'Deite-se no banco, segure a barra com pegada média, desça controladamente até o peito e empurre para cima.',
      muscleGroups: ['Peito', 'Tríceps', 'Ombro anterior'],
      equipment: ['Barra', 'Banco', 'Anilhas'],
      difficulty: 'Intermediário',
      categoryId: peitoCategory!.id,
      isPublic: true,
    },
    {
      name: 'Supino Inclinado',
      description: 'Exercício para parte superior do peitoral',
      instructions:
        'Ajuste o banco em 30-45 graus, execute o movimento de forma controlada.',
      muscleGroups: ['Peito superior', 'Tríceps', 'Ombro anterior'],
      equipment: ['Barra', 'Banco inclinado', 'Anilhas'],
      difficulty: 'Intermediário',
      categoryId: peitoCategory!.id,
      isPublic: true,
    },
    {
      name: 'Crucifixo',
      description: 'Exercício de isolamento para o peitoral',
      instructions:
        'Deite-se no banco, segure halteres e abra os braços em formato de cruz, contraindo o peitoral.',
      muscleGroups: ['Peito'],
      equipment: ['Halteres', 'Banco'],
      difficulty: 'Iniciante',
      categoryId: peitoCategory!.id,
      isPublic: true,
    },
    {
      name: 'Barra Fixa',
      description: 'Exercício fundamental para desenvolvimento das costas',
      instructions:
        'Segure a barra com pegada aberta, puxe o corpo até o queixo passar da barra, desça controladamente.',
      muscleGroups: ['Costas', 'Bíceps', 'Antebraços'],
      equipment: ['Barra fixa'],
      difficulty: 'Intermediário',
      categoryId: costasCategory!.id,
      isPublic: true,
    },
    {
      name: 'Remada Curvada',
      description: 'Exercício para espessura das costas',
      instructions:
        'Incline o tronco, segure a barra e puxe em direção ao abdômen, contraindo as costas.',
      muscleGroups: ['Costas', 'Bíceps', 'Posterior de ombro'],
      equipment: ['Barra', 'Anilhas'],
      difficulty: 'Intermediário',
      categoryId: costasCategory!.id,
      isPublic: true,
    },
    {
      name: 'Puxada Frontal',
      description: 'Exercício para largura das costas',
      instructions:
        'Sente-se no aparelho, puxe a barra em direção ao peito, contraindo as costas.',
      muscleGroups: ['Costas', 'Bíceps'],
      equipment: ['Aparelho de puxada'],
      difficulty: 'Iniciante',
      categoryId: costasCategory!.id,
      isPublic: true,
    },
    {
      name: 'Agachamento Livre',
      description: 'Rei dos exercícios para pernas',
      instructions:
        'Pés na largura dos ombros, desça até os quadris ficarem paralelos ao chão, empurre para cima.',
      muscleGroups: ['Quadríceps', 'Glúteos', 'Posteriores de coxa'],
      equipment: ['Barra', 'Anilhas'],
      difficulty: 'Avançado',
      categoryId: pernasCategory!.id,
      isPublic: true,
    },
    {
      name: 'Leg Press',
      description: 'Exercício seguro para desenvolvimento das pernas',
      instructions:
        'Sente-se no aparelho, empurre a plataforma com os pés, desça controladamente.',
      muscleGroups: ['Quadríceps', 'Glúteos'],
      equipment: ['Leg press'],
      difficulty: 'Iniciante',
      categoryId: pernasCategory!.id,
      isPublic: true,
    },
    {
      name: 'Extensão de Pernas',
      description: 'Exercício de isolamento para quadríceps',
      instructions:
        'Sente-se no aparelho, estenda as pernas contraindo o quadríceps, desça controladamente.',
      muscleGroups: ['Quadríceps'],
      equipment: ['Aparelho de extensão'],
      difficulty: 'Iniciante',
      categoryId: pernasCategory!.id,
      isPublic: true,
    },
    {
      name: 'Rosca Direta com Barra',
      description: 'Exercício fundamental para bíceps',
      instructions:
        'Em pé, segure a barra com pegada fechada, flexione os cotovelos contraindo o bíceps.',
      muscleGroups: ['Bíceps', 'Antebraços'],
      equipment: ['Barra', 'Anilhas'],
      difficulty: 'Iniciante',
      categoryId: bracosCategory!.id,
      isPublic: true,
    },
    {
      name: 'Tríceps Pulley',
      description: 'Exercício para desenvolvimento do tríceps',
      instructions:
        'Em pé, segure a barra do pulley, estenda os braços contraindo o tríceps.',
      muscleGroups: ['Tríceps'],
      equipment: ['Pulley', 'Barra'],
      difficulty: 'Iniciante',
      categoryId: bracosCategory!.id,
      isPublic: true,
    },
    {
      name: 'Desenvolvimento com Halteres',
      description: 'Exercício para desenvolvimento dos ombros',
      instructions:
        'Sente-se ou fique em pé, eleve os halteres acima da cabeça, desça controladamente.',
      muscleGroups: ['Ombro', 'Tríceps'],
      equipment: ['Halteres', 'Banco'],
      difficulty: 'Intermediário',
      categoryId: ombroCategory!.id,
      isPublic: true,
    },
    {
      name: 'Elevação Lateral',
      description: 'Exercício de isolamento para ombros',
      instructions:
        'Em pé, eleve os halteres lateralmente até a altura dos ombros, desça controladamente.',
      muscleGroups: ['Ombro médio'],
      equipment: ['Halteres'],
      difficulty: 'Iniciante',
      categoryId: ombroCategory!.id,
      isPublic: true,
    },
    {
      name: 'Abdominal Reto',
      description: 'Exercício básico para abdômen',
      instructions:
        'Deite-se no chão, flexione o tronco contraindo o abdômen, desça controladamente.',
      muscleGroups: ['Abdômen'],
      equipment: ['Colchonete'],
      difficulty: 'Iniciante',
      categoryId: abdomenCategory!.id,
      isPublic: true,
    },
    {
      name: 'Prancha',
      description: 'Exercício isométrico para core',
      instructions:
        'Apoie-se nos antebraços e pés, mantenha o corpo alinhado, contraia o abdômen.',
      muscleGroups: ['Abdômen', 'Core'],
      equipment: ['Colchonete'],
      difficulty: 'Intermediário',
      categoryId: abdomenCategory!.id,
      isPublic: true,
    },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {},
      create: {
        ...exercise,
        createdById: adminUser.id,
      },
    });
  }

  console.log(`✅ Criados ${exercises.length} exercícios`);
  console.log('🎉 Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
