# Prompts
## Projeto 1
How to Run:
1.  Navigate to the directory: cd habit-tracker
2.  Start the development server: npm run dev
3.  Open http://localhost:3000 (http://localhost:3000) in your browser.

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

- Tempo: 3 minutos

- Correções:
  - 1. utiliza next.js versão mais recente no lugar de react

Iniciada a Implementação em seguida em modo build

executado /init

- Erros (correções solicitadas):
  - 1. nada aparecendo na página principal
  - 2. 'import', and 'export' cannot be used outside of module code
  - 3. Runtime ReferenceError: newHabintName is not defined
  - 4. LLM não conseguiu corrigir o erro, tentar novamente em modo plan
  - 5. nova tentativa de correção utilizando mensagem de erro de compilação(npm run build)
  - 6. IA conseguiu achar o erro, uma variavel com nome errado mas por motivo desconhecido não conseguiu alterar, feita alteração manualmente

### Prompt 2 (Plan/Build mode)

Crie uma página /stats com estatísticas dos hábitos:
- Hábito mais consistente
- Taxa de conclusão por semanal
- Melhor e pior dia da semanal
- Use o Recharts para os gráficos

- Erros (correções solicitadas):
  - 1. não tem link da página principal para a página stats e a página stats não manteve o mesmo estilo de layout
  - 2. várias interrupções durante a execução, tive que mandar continuar a implementação
  - 3. mudou a cor de fundo sozinho criando um contraste ruim
  - 4. painel de estatísticas sumiu
  - 5. erro na hora de editar um arquivo, não sei se é da LLM ou do opencode

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
