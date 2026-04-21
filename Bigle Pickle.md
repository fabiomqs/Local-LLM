# Prompts
## Projeto 1

### Prompt 2 (Plan/Build mode)
Gere o plano de Implementação para o seguinte sistema
Crie um dashboard de hábitos (habit tracker) com as seguintes funcionalidades:
- Lista de hábitos com checkbox para marcar como feito no dia
- Streak counter (quantos dias seguidos)
- Gráfico simples de progresso semanal
- Possibilidade de adicionar e remover hábitos
- Design moderno e clean com dark moderno
- Use a localStorage para persistência por enquanto

Importante: Apenas gere o plano de implementação. Não execute nenhum comando. Não crie arquivos. Não instale dependências ainda. Quero revisar e aprovar o plano de qualquer execução.

- Notas:
  - gerou o projeto sem erros de primeira mas na pasta errada, subiu 1 ou 2 diretorios acima


### Prompt 2 (Plan/Build mode)

Crie uma página /stats com estatísticas dos hábitos:
- Hábito mais consistente
- Taxa de conclusão por semanal
- Melhor e pior dia da semanal
- Use o Recharts para os gráficos

- Notas:
  - gerou novamente sem erros

### Prompt 3 (Plan mode)

/init

### Prompt 4 (Plan/Build mode)

Crie testes com Vitest para os componentes principais?
- Testar adicionar/remover hábitos
- Testar marcar Hábito como feito
- Testar cálculo de streak

- Notas:
  - testes realizados com sucesso

### Prompt 5 (Plan/Build mode)

Crie um componente Navbar.tsx com navegação entre as páginas do projeto:
- Link para Home (/) - ícone de casa + "Hábitos"
- Link para Stats (/stats) - ícone de gráfico + "Estatísticas"
- Navbar fixa no topo, estilo glassmorphims combinado com design atual
- Highlight no link da página ativa
- Adicione a navbar no layout.tsx para aparecer em todas as páginas

- Notas:
  - alterações realizadas com sucesso