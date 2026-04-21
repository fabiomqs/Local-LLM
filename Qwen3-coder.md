# Prompts
## Projeto 1
### Prompt 1
/init
- Tempo: 
- Erros:
- Correções
- Comentários
### Prompt 2 (Plan mode)
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
  - não sugeriu nenhuma tecnologia para o projeto, tive que mandar usar Next js
  - Criou um plano grande e aparentemente consistente
  - primeira versão com erro 404 na página inicial
  - tentou corrigir e continuou com o mesmo erro
  - apareceu a página mas sem nenhum estilo aplicado
  - continua sem estilos e hábitos adicionados não aparecem na lista
  - depois de fechar o contexto a ferramenta apresentou comportamento estranho, reiniciando antigravity
  - executado /init
  - nova tentativa e continua com mesmo err

Projeto abandonado aqui



### Prompt 3 (Build mode)

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
