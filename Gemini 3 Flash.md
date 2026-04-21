# Prompts
## Projeto 1

### Prompt 1 (Plan mode)
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
  - Foi direto pro react.
  - tive que mandar mudar o estili de css puro pra tailwind
  - gerou o projeto sem erros

### Prompt 2 (Plan/Build mode)

Crie uma página /stats com estatísticas dos hábitos:
- Hábito mais consistente
- Taxa de conclusão por semanal
- Melhor e pior dia da semanal
- Use o Recharts para os gráficos

- Notas:
  - gerou o projeto sem erros

### Prompt 3 (Plan/Build mode)

- atualize e mantenha atualizado o arquivo AGENTS.md com as informações mais relevantes do projeto, as informações que vc gostaria de saber quando fosse atualizar o projeto

- Notas:
  - falta um comando /init no antigravity como tem nas demais ferramentas

### Prompt 4 (Plan/Build mode)

Crie testes com Vitest para os componentes principais:
- Testar adicionar/remover hábitos
- Testar marcar Hábito como feito
- Testar cálculo de streak

- Notas:
  - executado com sucess

### Prompt 5 (Plan/Build mode)

Crie um componente Navbar.tsx com navegação entre as páginas do projeto:
- Link para Home (/) - ícone de casa + "Hábitos"
- Link para Stats (/stats) - ícone de gráfico + "Estatísticas"
- Navbar fixa no topo, estilo glassmorphims combinado com design atual
- Highlight no link da página ativa
- Adicione a navbar no layout.tsx para aparecer em todas as páginas

- Notas:
  - gerou sem problemas