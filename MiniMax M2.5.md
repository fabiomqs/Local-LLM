# Prompts
## Projeto 1

### Prompt 1 (Plan/Build mode)
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
  - perguntou qual tecnologia utilizar e pergunta básica sobre estilo
  - travou em um erro e tive que cancelar porque demorou muito
  - o problema é quando executa o script pra iniciar o servido node
  - gerou o conteúdo centralizado a esquerda e colado no topo

### Prompt 2 (Build mode)

Crie uma página /stats com estatísticas dos hábitos:
- Hábito mais consistente
- Taxa de conclusão por semanal
- Melhor e pior dia da semanal
- Use o Recharts para os gráficos

- Notas:
  - executei direto sem o modo plan
  - o design não é dos melhores mas funciona

### Prompt 3 (Build mode)

/init

### Prompt 4 (Build mode)

Crie testes com Vitest para os componentes principais?
- Testar adicionar/remover hábitos
- Testar marcar Hábito como feito
- Testar cálculo de streak

- Notas:
  - testes criados e executados com sucesso
  - não validei a qualidade dos testes

### Prompt 4 (Build mode)

Crie um componente Navbar.tsx com navegação entre as páginas do projeto:
- Link para Home (/) - ícone de casa + "Hábitos"
- Link para Stats (/stats) - ícone de gráfico + "Estatísticas"
- Navbar fixa no topo, estilo glassmorphims combinado com design atual
- Highlight no link da página ativa
- Adicione a navbar no layout.tsx para aparecer em todas as páginas

- Notas:
  - gerou navbar com alinhamento errado também
  - tentou corrigir mas a navbar continuou desalinhada
  - LLM não conseguiu corrigir o alinhamento da navbar em relação ao conteúdo, finalizando por aqui