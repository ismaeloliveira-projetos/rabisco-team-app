# Rabisco Team - Backend

Backend completo para o aplicativo Rabisco Team desenvolvido com NestJS, Prisma e PostgreSQL (NeonDB).

## 🚀 Tecnologias

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL (NeonDB)
- JWT Authentication
- RBAC (Role Based Access Control)
- bcrypt
- class-validator
- class-transformer

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL="sua_url_do_neondb"
JWT_SECRET="seu_jwt_secret"
PORT=3000
```

## 🗄️ Banco de Dados

### Gerar Prisma Client

```bash
npm run prisma:generate
```

### Executar Migrations

```bash
npm run prisma:migrate
```

### Popular Banco com Dados Iniciais

```bash
npm run prisma:seed
```

## 🏃 Executar

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

## 📚 Estrutura de Rotas

### Autenticação
- `POST /auth/register` - Cadastro de usuário
- `POST /auth/login` - Login

### Usuários
- `GET /users/me` - Obter perfil do usuário logado
- `POST /users/profile` - Criar perfil
- `PUT /users/profile` - Atualizar perfil

### Exercícios
- `GET /exercises` - Listar exercícios
- `GET /exercises/categories` - Listar categorias
- `GET /exercises/:id` - Obter exercício
- `POST /exercises` - Criar exercício (autenticado)
- `PATCH /exercises/:id` - Atualizar exercício (autenticado)
- `DELETE /exercises/:id` - Excluir exercício (autenticado)

### Treinos
- `GET /workouts` - Listar treinos
- `GET /workouts/:id` - Obter treino
- `POST /workouts` - Criar treino (master/collaborator)
- `PATCH /workouts/:id` - Atualizar treino (master/collaborator)
- `DELETE /workouts/:id` - Excluir treino (master/collaborator)

### Dietas
- `GET /diets` - Listar dietas
- `GET /diets/:id` - Obter dieta
- `POST /diets` - Criar dieta (master/collaborator)
- `PATCH /diets/:id` - Atualizar dieta (master/collaborator)
- `DELETE /diets/:id` - Excluir dieta (master/collaborator)

### Anamnese
- `POST /anamnesis` - Criar anamnese
- `GET /anamnesis/:userId` - Obter anamnese
- `PATCH /anamnesis/:userId` - Atualizar anamnese

## 🔐 Autenticação

Todas as rotas protegidas requerem um token JWT no header:

```
Authorization: Bearer <token>
```

## 👥 Roles

- `master` - Acesso total
- `collaborator` - Pode criar/editar treinos e dietas
- `student` - Acesso apenas aos próprios dados

## 📝 Notas

- O seed cria um usuário admin padrão: `admin@rabisco.com` / `admin123`
- Todos os exercícios são criados em português
- O sistema suporta múltiplos roles por usuário
