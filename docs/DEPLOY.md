# Publicação do QuadraControl

## Antes de publicar

Crie uma chave JWT longa e única. Não use a chave de exemplo em produção. Você também precisará de um banco PostgreSQL acessível pela internet.

## API e banco no Railway

1. Envie este projeto para um repositório no GitHub.
2. No Railway, crie um projeto e adicione o banco **PostgreSQL**.
3. Adicione outro serviço a partir do repositório; o Railway utilizará o arquivo `railway.toml`.
4. Em *Variables*, configure:

   - `DATABASE_URL`: use a URL fornecida pelo PostgreSQL do Railway.
   - `JWT_SECRET`: chave longa e secreta.
   - `FRONTEND_URL`: endereço que será criado no Vercel, por exemplo `https://quadracontrol.vercel.app`.
   - `PORT`: `3001`.

5. No primeiro deploy, abra o terminal do serviço e execute `pnpm --filter @quadracontrol/api prisma:migrate` e `pnpm --filter @quadracontrol/api prisma:seed`.

## Interface no Vercel

1. No Vercel, importe o mesmo repositório.
2. Defina `frontend` como diretório raiz do projeto.
3. Adicione a variável `NEXT_PUBLIC_API_URL` com o endereço da API seguido de `/api`, por exemplo `https://sua-api.up.railway.app/api`.
4. Publique o projeto.
5. Copie a URL final do Vercel para `FRONTEND_URL` no Railway e faça novo deploy da API.

## Primeiro acesso

O comando de dados iniciais cria:

- Usuário: `admin`
- Senha inicial: `admin123`

Entre e altere essa senha antes de cadastrar os usuários da equipe.

## Domínio próprio

O domínio deve ser configurado no Vercel. Depois de adicionar o domínio, atualize `FRONTEND_URL` da API com o domínio final.
