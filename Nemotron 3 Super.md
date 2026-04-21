# Prompts
## Projeto 1
configurado como medium
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
  - gerou com erro, somente mostra página inicial do Next, se atrapalhou com os diretórios
  - está com dificuldade de realizar a correção e demorando bastante
  - não conseguiu corrigir o erro e ainda retornou mensagem "Provider returne Error"

Abandonado aqui

### Prompt 2 (Plan/Build mode)

Crie uma página /stats com estatísticas dos hábitos:
- Hábito mais consistente
- Taxa de conclusão por semanal
- Melhor e pior dia da semanal
- Use o Recharts para os gráficos


------------------------------------------------------------------------------------------

Crie testes com Vitest para os componentes principais?
- Testar adicionar/remover hábitos
- Testar marcar Hábito como feito
- Testar cálculo de streak

------------------------------------------------------------------------------------------

Crie um componente Navbar.tsx com navegação entre as páginas do projeto:
- Link para Home (/) - ícone de casa + "Hábitos"
- Link para Stats (/stats) - ícone de gráfico + "Estatísticas"
- Navbar fixa no topo, estilo glassmorphims combinado com design atual
- Highlight no link da página ativa
- Adicione a navbar no layout.tsx para aparecer em todas as páginas
