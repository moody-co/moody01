# Moody Mobile — Roadmap de robustez do front-end

Este roadmap separa o trabalho em trilhas que podem avançar sem bloquear umas às outras. Quando uma tarefa depender de outra, a dependência será indicada explicitamente e não será iniciada antes de seu pré-requisito.

## Regras de execução

- Cada entrega deve manter o aplicativo compilando.
- Cada etapa deve ter um critério de aceite verificável.
- Alterações de infraestrutura não devem modificar o comportamento visual sem necessidade.
- Mocks continuam utilizáveis enquanto o backend não estiver pronto.
- Contratos de API ficam isolados na camada de serviços e mappers.
- Nenhum token ou dado sensível pode ser registrado em logs.


## Fila operacional por preferência

A execução seguirá pacotes pequenos. Nenhum pacote será iniciado misturando uma dependência ainda não resolvida.

1. **Fundação compilável** — providers, tipos, rotas acidentais e quality gates.
2. **Sessão local e proteção de rotas** — apenas responsabilidades do front; usa o contrato atual.
3. **Resiliência visual** — ScreenState, skeletons e Error Boundaries; pode avançar mesmo se autenticação bloquear.
4. **React Query com mocks** — migração dos hooks sem depender da API final.
5. **Performance com mocks** — FlashList e expo-image.
6. **Cliente HTTP genérico** — timeout, cancelamento, parse e ApiError, sem refresh acoplado.
7. **Integração do refresh** — somente após existir uma autoridade de sessão única.
8. **Produção** — EAS, Sentry, OTA e metadados.

Se o pacote ativo bloquear por contrato externo, o próximo pacote independente é iniciado sem alterar a ordem interna dos arquivos relacionados.

## Ordem de preferência

### Trilha A — Fundação e qualidade automática — P0

**Independente do backend.**

- [x] Criar este roadmap dentro do repositório.
- [x] Adicionar comando de verificação TypeScript.
- [x] Remover conflito entre versões de tipos do React.
- [x] Manter somente o lockfile raiz do monorepo.
- [x] Instalar o `QueryClientProvider` no layout raiz real.
- [x] Remover a rota `modal.tsx` criada como cópia do layout.
- [x] Corrigir o mapper do Discover para o contrato atual de eventos.
- [ ] Corrigir todos os erros restantes do TypeScript.
- [ ] Corrigir todos os erros e avisos relevantes do ESLint.
- [ ] Garantir inicialização limpa em Android e web.

**Aceite:** `npm run typecheck` e `npm run lint` sem erros; aplicativo inicia sem exceção.

### Trilha B — Estados visuais e resiliência de UI — P0

**Independente do backend e da autenticação.**

- [ ] Padronizar `ScreenState` para loading, erro, vazio e offline.
- [ ] Criar skeletons específicos para Discover, Tickets, Live e Profile.
- [ ] Diferenciar carregamento inicial de atualização em segundo plano.
- [ ] Criar fallback de imagem.
- [ ] Criar Error Boundary global.
- [ ] Criar Error Boundaries por grupos críticos de rotas.
- [ ] Padronizar botões de tentar novamente.

**Aceite:** uma falha de renderização em uma tela não fecha o aplicativo; todas as telas possuem estados inicial, vazio e erro consistentes.

### Trilha C — Infraestrutura de dados e cache — P0

**Pode operar com mocks; não depende do backend final.**

- [x] Criar QueryClient global único.
- [ ] Definir fábrica central de query keys.
- [ ] Integrar AppState ao `focusManager`.
- [ ] Integrar conectividade ao `onlineManager`.
- [ ] Migrar `use-profile`.
- [ ] Migrar `use-tickets`.
- [ ] Migrar `use-discover-feed`.
- [ ] Migrar `use-live-now`.
- [ ] Configurar invalidação e atualização manual.
- [ ] Configurar polling do Live somente quando tela, app e conexão estiverem ativos.

**Aceite:** hooks sem `useEffect`/`useState` manual para requisições; cache e refetch funcionam com mocks.

### Trilha D — Performance de listas e mídia — P1

**Independente do backend; usa os dados mockados atuais.**

- [ ] Migrar Discover para FlashList.
- [ ] Migrar Tickets para FlashList.
- [ ] Migrar imagens prioritárias para `expo-image`.
- [ ] Usar cache de memória e disco.
- [ ] Adicionar placeholder e transição.
- [ ] Adicionar `recyclingKey` em listas recicláveis.
- [ ] Reduzir imagens remotas superdimensionadas nos mocks.
- [ ] Validar scroll em build release.

**Aceite:** sem flicker, troca de imagem ou travamento perceptível em listas extensas.

### Trilha E — Sessão, autenticação e proteção de rotas — P0

**A lógica do front pode ser concluída com o contrato atual; validação final depende dos endpoints do backend.**

- [ ] Definir uma única autoridade de sessão.
- [x] Corrigir o contrato imediato entre `auth.context` e `auth.storage`.
- [ ] Manter access token somente em memória.
- [ ] Persistir somente refresh token no SecureStore.
- [ ] Remover mecanismos duplicados de refresh.
- [ ] Modelar estados `booting`, `authenticated`, `anonymous` e `expired`.
- [ ] Proteger grupos privados, inclusive deep links.
- [ ] Impedir acesso às rotas de autenticação quando já autenticado.
- [ ] Limpar cache privado no logout.
- [ ] Evitar envio múltiplo de login e cadastro.

**Aceite:** abertura direta de uma rota privada sem sessão sempre leva ao login; logout remove sessão e dados privados.

### Trilha F — Cliente HTTP e tratamento de erros — P0

**Parte genérica é independente; refresh integrado depende da Trilha E.**

- [ ] Separar transporte HTTP de navegação.
- [ ] Criar timeout e cancelamento.
- [ ] Padronizar parse de resposta.
- [ ] Padronizar `ApiError` e códigos de UI.
- [ ] Impedir retry automático de erros não recuperáveis.
- [ ] Adicionar request ID e contexto seguro para telemetria.
- [ ] Integrar refresh único após conclusão da autoridade de sessão.
- [ ] Reprocessar requisições somente uma vez.
- [ ] Proteger mutações críticas contra repetição insegura.

**Aceite:** erro técnico nunca aparece diretamente ao usuário; o cliente HTTP não importa o router.

### Trilha G — Configuração de produção e observabilidade — P1

**Independente do backend, exceto URL final de produção.**

- [ ] Completar identificadores Android e iOS.
- [ ] Revisar ícone adaptativo, splash e scheme.
- [ ] Configurar mensagem e fluxo de permissão da câmera.
- [ ] Criar `eas.json` para development, preview e production.
- [ ] Instalar e configurar Sentry.
- [ ] Configurar source maps.
- [ ] Configurar EAS Update, canais e runtime version.
- [ ] Documentar rollout e rollback.
- [ ] Remover fallback localhost de builds de produção.

**Aceite:** builds preview e production isolados; crash de teste aparece com stack legível; atualização OTA de staging funciona.

## Estratégia para evitar bloqueios

Se uma trilha ficar bloqueada, seguir imediatamente para a próxima tarefa independente nesta ordem:

1. Fundação e qualidade.
2. Resiliência visual.
3. Cache usando mocks.
4. Performance usando mocks.
5. Configuração de produção.
6. Integração de autenticação e rede.

## Entregas planejadas

- **Entrega 1:** fundação compilável e providers corretos.
- **Entrega 2:** estados visuais e Error Boundaries.
- **Entrega 3:** React Query nos quatro domínios.
- **Entrega 4:** FlashList e `expo-image`.
- **Entrega 5:** sessão e cliente HTTP unificados.
- **Entrega 6:** EAS, Sentry e OTA.
