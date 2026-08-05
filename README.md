# QuadraControl

Sistema para controlar visitas e serviços realizados em quadras de bairros.

## Início rápido

1. Copie `.env.example` para `.env` e ajuste os valores.
2. Inicie o PostgreSQL: `docker compose up -d`.
3. Instale as dependências: `pnpm install`.
4. Gere o cliente e aplique o banco: `pnpm --filter @quadracontrol/api prisma:generate` e `pnpm --filter @quadracontrol/api prisma:migrate`.
5. Crie os dados iniciais: `pnpm --filter @quadracontrol/api prisma:seed`.
6. Inicie a API: `pnpm dev:api`; em outro terminal, a interface: `pnpm dev:web`.

A interface abre em `http://localhost:3000` e a API em `http://localhost:3001/api`.

## Estrutura

- `frontend/`: Next.js, telas e componentes responsivos.
- `backend/`: NestJS, Prisma, autenticação JWT e regras de negócio.
- `docs/DEPLOY.md`: publicação no Railway e Vercel.
- `docs/OPERACAO.md`: rotina, segurança e backup.
