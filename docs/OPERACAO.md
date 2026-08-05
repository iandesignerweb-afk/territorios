# Operação do QuadraControl

## Rotina recomendada

1. Cadastre cidades, bairros e quadras.
2. Crie os usuários da equipe e defina suas permissões.
3. A equipe marca as quadras na tela **Quadras**.
4. O administrador acompanha o avanço no painel e nos relatórios.
5. Ao concluir todas as quadras de um bairro, use **Resetar bairro** para iniciar um ciclo novo. O histórico anterior é preservado.

## Segurança

- Use uma senha forte para o administrador e crie uma conta individual para cada pessoa.
- Não compartilhe contas.
- Mantenha `JWT_SECRET` e `DATABASE_URL` fora do GitHub; use somente variáveis de ambiente.
- Revogue ou inative usuários que não fazem mais parte da equipe.
- Faça backup periódico do banco PostgreSQL no Railway.

## Backup

No Railway, utilize o backup do PostgreSQL disponível no seu plano. Para uma cópia manual, use uma ferramenta PostgreSQL com a variável `DATABASE_URL` e guarde o arquivo em local seguro.
