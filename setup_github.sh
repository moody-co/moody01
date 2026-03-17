#!/usr/bin/env bash
# =============================================================================
# MOODY — GitHub Project Setup via CLI
# =============================================================================
# Pré-requisitos:
#   1. gh CLI instalado: https://cli.github.com
#   2. Autenticado: gh auth login
#   3. Dentro do repo: cd moody01 (ou o nome do repositório)
#   4. Project Board já criado manualmente na UI com as 5 colunas
#
# Uso:
#   chmod +x setup_github.sh
#   ./setup_github.sh
#
# O script é idempotente — pode rodar mais de uma vez sem duplicar.
# =============================================================================

set -euo pipefail

# ─── CONFIG — ALTERE AQUI ────────────────────────────────────────────────────
REPO_OWNER="moody-co"   # ex: lucasguerra ou moody-team
REPO_NAME="moody01"                # nome exato do repositório
PROJECT_NUMBER="2"                 # número do Project (aparece na URL: /projects/1)
# ─────────────────────────────────────────────────────────────────────────────

REPO="$REPO_OWNER/$REPO_NAME"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║         MOODY — GitHub Project Setup Script          ║"
echo "║   Repo: $REPO"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# =============================================================================
# 1. LABELS
# =============================================================================
echo "▶ [1/4] Criando labels..."

create_label() {
  local name="$1" color="$2" desc="$3"
  gh label create "$name" \
    --color "$color" \
    --description "$desc" \
    --repo "$REPO" \
    --force 2>/dev/null && echo "  ✓ label: $name" || echo "  ~ label já existe: $name"
}

# Tipo
create_label "feat"            "0075ca" "Nova funcionalidade"
create_label "fix"             "d73a4a" "Correção de bug"
create_label "chore"           "e4e669" "Infra, build ou config"
create_label "docs"            "0075ca" "Documentação"
create_label "refactor"        "84b6eb" "Refatoração sem mudança de comportamento"
create_label "test"            "bfd4f2" "Testes automatizados"

# Área
create_label "area: backend"   "1d76db" "Fastify / Prisma / Node"
create_label "area: frontend"  "7057ff" "Expo / React Native"
create_label "area: devops"    "e4e669" "Docker, CI/CD, Deploy"
create_label "area: fullstack" "0e8a16" "Envolve front + back"

# Prioridade
create_label "priority: high"   "e11d48" "Bloqueia outras tasks"
create_label "priority: medium" "f97316" "Importante mas não bloqueia"
create_label "priority: low"    "22c55e" "Nice to have"

# Status especiais
create_label "blocked"          "b60205" "Aguardando dependência externa"
create_label "good first issue" "7057ff" "Boa entrada para o time"
create_label "already done"     "0e8a16" "Implementado antes do board — fechado automaticamente"

echo "  Labels criadas!"
echo ""

# =============================================================================
# 2. MILESTONES (via gh api)
# =============================================================================
echo "▶ [2/4] Criando milestones..."

create_milestone() {
  local title="$1" desc="$2" due="$3"
  gh api \
    --method POST \
    -H "Accept: application/vnd.github+json" \
    "/repos/$REPO/milestones" \
    -f title="$title" \
    -f description="$desc" \
    -f due_on="${due}T23:59:59Z" \
    --silent && echo "  ✓ milestone: $title" || echo "  ~ milestone já existe: $title"
}

# Ajuste as datas conforme o início real do projeto (formato: YYYY-MM-DD)
create_milestone "Sprint 1 — Foundation"      "Infra + Auth + API Core funcionando"       "2025-04-11"
create_milestone "Sprint 2 — Core Features"   "Termômetro ao vivo + GPS + integração real" "2025-04-25"
create_milestone "Sprint 3 — Polish & Launch" "Pagamentos + Deploy + QA completo"          "2025-05-09"

echo "  Milestones criados!"
echo ""

# =============================================================================
# 3. ISSUES
# =============================================================================
echo "▶ [3/4] Criando issues..."

# Helper: cria issue e retorna o número
create_issue() {
  local title="$1" body="$2" labels="$3" milestone="$4"
  gh issue create \
    --repo "$REPO" \
    --title "$title" \
    --body "$body" \
    --label "$labels" \
    --milestone "$milestone" \
    --assignee "@me" 2>/dev/null | grep -o '[0-9]*$' || echo "0"
}

# Helper: fecha issue (para as "already done")
close_issue() {
  local number="$1" reason="${2:-completed}"
  gh issue close "$number" --repo "$REPO" --reason "$reason" 2>/dev/null
  echo "  ✓ fechada: #$number"
}

echo ""
echo "  ── Sprint 1: Foundation ──────────────────────────────"

N=$(gh issue create --repo "$REPO" \
  --title "Docker Compose: backend + MySQL + Redis" \
  --label "chore,area: devops,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Criar \`docker-compose.yml\` com serviços backend, MySQL 8 e Redis. Incluir healthchecks e variáveis de ambiente via \`.env.example\`.

## Critérios de Aceitação
- [ ] \`docker compose up\` sobe todos os serviços sem erros
- [ ] Backend conecta no MySQL e no Redis automaticamente ao iniciar
- [ ] Arquivo \`.env.example\` documentado com todas as variáveis obrigatórias
- [ ] README atualizado com instruções de setup local

## Dependências
Nenhuma — esta é a issue de fundação.")
echo "  ✓ criada: $N (Docker Compose)"

N=$(gh issue create --repo "$REPO" \
  --title "GitHub Actions: lint + build em PRs" \
  --label "chore,area: devops,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Workflow que roda em todo PR para \`develop\`/\`main\`: eslint e \`tsc --noEmit\` no backend e no moody-native.

## Critérios de Aceitação
- [ ] PR com erro de lint falha o check automaticamente
- [ ] PR com erro de TypeScript falha o check
- [ ] Badge de status visível no README
- [ ] Workflow roda em < 3 minutos")
echo "  ✓ criada: $N (GitHub Actions)"

N=$(gh issue create --repo "$REPO" \
  --title "Migrations Prisma + seed inicial de venues/events" \
  --label "chore,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Rodar \`prisma migrate dev\` com o schema atual. Criar \`seed.ts\` com 5 venues e 8 eventos de exemplo em São José dos Campos.

## Critérios de Aceitação
- [ ] \`prisma migrate dev\` roda sem erros localmente
- [ ] \`prisma db seed\` popula o banco com dados de exemplo
- [ ] Seed inclui venues de categoria BAR, CLUB e RESTAURANT
- [ ] Eventos têm promoções e datas futuras válidas
- [ ] \`prisma studio\` exibe os dados corretamente")
echo "  ✓ criada: $N (Migrations + Seed)"

N=$(gh issue create --repo "$REPO" \
  --title "GET /venues — listar com filtros (city, category, paginação)" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Implementar \`VenuesService.list()\` com filtros de \`city\`, \`category\` e paginação (\`page\`, \`limit\`). Retornar distância quando \`lat\`/\`lng\` enviados.

## Critérios de Aceitação
- [ ] Filtra por \`city\` (case-insensitive)
- [ ] Filtra por \`category\` (enum VenueCategory)
- [ ] Paginação com page/limit (default 1/20, max 50)
- [ ] Ordena por distância quando lat+lng fornecidos (haversine)
- [ ] Retorna \`{ ok, venues, total, page }\`
- [ ] Testado no Postman com diferentes combinações de filtro")
echo "  ✓ criada: $N (GET /venues)"

N=$(gh issue create --repo "$REPO" \
  --title "GET /venues/:venueId — detalhe do venue" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Implementar \`VenuesService.findById()\`. Retornar 404 com AppError se não encontrado.

## Critérios de Aceitação
- [ ] Retorna dados completos do venue
- [ ] 404 para venueId inexistente
- [ ] Inclui contagem de checkins das últimas 2h (\`peopleHere\`)")
echo "  ✓ criada: $N (GET /venues/:id)"

N=$(gh issue create --repo "$REPO" \
  --title "GET /events — listar com filtros e thermometer" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Implementar \`EventsService.list()\` com filtros de \`city\`, \`vibeKey\` (mapeado para VenueCategory), \`date\` e paginação. Incluir campo \`thermometer\` calculado.

## Critérios de Aceitação
- [ ] Filtra por \`city\` e \`date\` (default: hoje)
- [ ] \`vibeKey=club\` retorna events de venues CLUB
- [ ] Cada event inclui campo \`thermometer\` (HOT/WARM/COLD)
- [ ] Inclui \`peopleHere\` (contagem de presença ativa nas últimas 2h)
- [ ] Ordena por thermometer score descrescente

## Depende de
#11 (lógica do termômetro)")
echo "  ✓ criada: $N (GET /events)"

N=$(gh issue create --repo "$REPO" \
  --title "GET /events/:eventId — detalhe ao vivo" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Implementar \`EventsService.findById()\` retornando dados completos com thermometer, peopleHere e últimos 10 checkins.

## Critérios de Aceitação
- [ ] Retorna \`promoTitle\`, \`promoText\`, \`startsAt\`, \`endsAt\`
- [ ] Campo \`thermometer\` calculado em tempo real
- [ ] \`liveCheckins\`: últimos 10 checkins com \`userName\` e \`minutesAgo\`
- [ ] 404 para eventId inexistente")
echo "  ✓ criada: $N (GET /events/:id)"

N=$(gh issue create --repo "$REPO" \
  --title "POST /presence/verify — verificação GPS" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Verificar que as coordenadas enviadas estão dentro de 200m do venue. Criar \`PresenceVerification\` com \`unlockAt = now + 30min\`.

## Critérios de Aceitação
- [ ] Calcula distância haversine entre GPS do user e lat/lng do venue
- [ ] 422 se distância > 200m
- [ ] 201 com \`presence.unlockAt\` se dentro do raio
- [ ] Segundo POST para mesmo userId+eventId retorna a presença existente (sem duplicar)
- [ ] Campo \`unlockAt = verifiedAt + 30 minutos\`")
echo "  ✓ criada: $N (POST /presence/verify)"

N=$(gh issue create --repo "$REPO" \
  --title "GET /presence/:eventId — status de presença" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Retornar se o usuário autenticado tem presença verificada e se o unlock já liberou.

## Critérios de Aceitação
- [ ] 200 com \`{ status: 'verified'|'locked'|'none', unlockAt }\`
- [ ] \`status=locked\` quando \`verifiedAt\` existe mas \`unlockAt > now\`
- [ ] \`status=none\` quando sem presença registrada
- [ ] Rota protegida por JWT")
echo "  ✓ criada: $N (GET /presence/:id)"

N=$(gh issue create --repo "$REPO" \
  --title "POST /checkins — criar avaliação com validação de presença" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Criar checkin validando que o usuário tem \`PresenceVerification\` com \`unlockAt <= now\` para o evento. Calcular e retornar o novo thermometer.

## Critérios de Aceitação
- [ ] 403 se sem presença verificada para o evento
- [ ] 403 se \`unlockAt\` ainda não chegou (mensagem clara)
- [ ] Valida enums: \`crowded\`, \`vibe\`, \`promoActive\`, \`worthIt\`
- [ ] 201 com checkin criado e \`thermometerUpdated: true\`
- [ ] Apenas 1 checkin por usuário por evento")
echo "  ✓ criada: $N (POST /checkins)"

N=$(gh issue create --repo "$REPO" \
  --title "Lógica do termômetro — função pura" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 1 — Foundation" \
  --body "## Descrição
Criar função \`calculateThermometer(checkins[])\` que retorna \`HOT | WARM | COLD\` com base nos checkins das últimas 2h. Sem Redis ainda.

## Critérios de Aceitação
- [ ] \`HOT\`: 5+ checkins E vibe média >= LIVELY nas últimas 2h
- [ ] \`WARM\`: 2–4 checkins OU vibe >= OK
- [ ] \`COLD\`: 0–1 checkins OU vibe = LOW na maioria
- [ ] Função pura — sem side effects, testável isoladamente
- [ ] Exportada como utilitário (\`src/shared/utils/thermometer.ts\`)")
echo "  ✓ criada: $N (Termômetro — função pura)"

echo ""
echo "  ── Sprint 2: Core Features ───────────────────────────"

N=$(gh issue create --repo "$REPO" \
  --title "Redis: cache do termômetro e contagem de presença" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Integrar \`ioredis\`. Cachear resultado do thermometer por eventId (TTL 60s). Usar sorted set para contar usuários presentes.

## Critérios de Aceitação
- [ ] Thermometer calculado no banco apenas quando cache expira
- [ ] Contagem de presença via Redis ZSET com TTL de 2h
- [ ] Cache invalidado automaticamente ao receber novo checkin
- [ ] Conexão Redis configurada via variável \`REDIS_URL\`")
echo "  ✓ criada: $N (Redis)"

N=$(gh issue create --repo "$REPO" \
  --title "WebSocket: namespace /events com Socket.IO" \
  --label "feat,area: backend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Integrar Socket.IO ao Fastify. Criar namespace \`/events\` com rooms por eventId. Autenticação via token no handshake.

## Critérios de Aceitação
- [ ] Cliente entra na room: \`socket.emit('join', { eventId })\`
- [ ] Autenticação via query param \`token\` no handshake (valida JWT)
- [ ] Server emite \`thermometer:update\` ao receber novo checkin
- [ ] Server emite \`checkin:new\` com \`{ userName, message, minutesAgo }\`
- [ ] Server emite \`presence:count\` com contagem atual
- [ ] Cliente sai da room: \`socket.emit('leave', { eventId })\`")
echo "  ✓ criada: $N (WebSocket backend)"

N=$(gh issue create --repo "$REPO" \
  --title "Conectar Discover Screen com GET /events real" \
  --label "feat,area: frontend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Substituir \`mockEvents\` por chamada real a \`GET /events\`. Implementar \`discover.services.ts\` com \`useDiscoverFeed\` hook integrado.

## Critérios de Aceitação
- [ ] Lista carrega de \`GET /events\` com filtro de vibeKey selecionado
- [ ] Loading skeleton enquanto carrega
- [ ] Estado de erro com botão de retry
- [ ] Pull-to-refresh funcional
- [ ] Sem dados mockados no código de produção")
echo "  ✓ criada: $N (Discover → API real)"

N=$(gh issue create --repo "$REPO" \
  --title "Conectar Event Detail com GET /events/:eventId real" \
  --label "feat,area: frontend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Event Detail Screen consome \`GET /events/:eventId\`. Exibir thermometer badge, peopleHere e liveCheckins reais.

## Critérios de Aceitação
- [ ] Dados do evento vêm do backend (sem mock)
- [ ] Badge HOT/WARM/COLD renderiza conforme campo \`thermometer\`
- [ ] \`liveCheckins\` exibem \`userName\` e \`minutesAgo\` reais
- [ ] 404 redireciona para tela anterior com toast")
echo "  ✓ criada: $N (Event Detail → API real)"

N=$(gh issue create --repo "$REPO" \
  --title "GPS real na Presence Screen (expo-location)" \
  --label "feat,area: frontend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Substituir mock de verificação por \`expo-location\`. Solicitar permissão, capturar coordenadas e chamar \`POST /presence/verify\`.

## Critérios de Aceitação
- [ ] Solicita permissão de localização antes de usar
- [ ] Loading enquanto obtém GPS e aguarda resposta da API
- [ ] Erro claro se permissão negada pelo usuário
- [ ] Erro claro se GPS fora do raio (422 da API)
- [ ] Sucesso navega para \`verified.tsx\` com dados reais de \`unlockAt\`")
echo "  ✓ criada: $N (GPS real)"

N=$(gh issue create --repo "$REPO" \
  --title "Presence Verified: timer real calculado a partir de unlockAt" \
  --label "feat,area: frontend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Timer na tela \`verified.tsx\` calculado a partir de \`unlockAt\` retornado pela API. Ao zerar, navegar automaticamente para \`checkin.tsx\`.

## Critérios de Aceitação
- [ ] Timer conta regressivamente até \`unlockAt\` real (não hardcoded)
- [ ] Ao atingir 0, navega para checkin sem interação do usuário
- [ ] Se app for minimizado e reaberto, timer continua de onde parou
- [ ] \`unlockAt\` persistido no AsyncStorage")
echo "  ✓ criada: $N (Timer real)"

N=$(gh issue create --repo "$REPO" \
  --title "Formulário de check-in integrado ao POST /checkins" \
  --label "feat,area: frontend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Quick Check-in Screen envia \`POST /checkins\` com os valores do formulário.

## Critérios de Aceitação
- [ ] Envia \`crowded\`, \`vibe\`, \`promoActive\`, \`worthIt\` para o backend
- [ ] Loading state no botão Submit
- [ ] Erro 403 exibe mensagem 'Presença necessária para avaliar'
- [ ] Sucesso navega para \`thanks.tsx\`
- [ ] Botão desabilitado após submit (evitar duplicata)")
echo "  ✓ criada: $N (Checkin → API real)"

N=$(gh issue create --repo "$REPO" \
  --title "Upload de foto de validação (câmera → storage)" \
  --label "feat,area: fullstack,priority: medium" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Câmera captura foto, backend recebe upload e salva URL. \`photoUrl\` incluído no checkin.

## Critérios de Aceitação
- [ ] Foto capturada via \`expo-camera\`
- [ ] POST \`/checkins\` aceita \`photoUrl\`
- [ ] Foto armazenada em Cloudinary ou S3
- [ ] Foto NÃO é exibida publicamente — apenas para moderação interna
- [ ] Campo opcional: checkin funciona sem foto

## Nota
Se o tempo apertar, esta issue pode ser movida para Sprint 3.")
echo "  ✓ criada: $N (Upload de foto)"

N=$(gh issue create --repo "$REPO" \
  --title "WebSocket no app: termômetro e live check-ins em tempo real" \
  --label "feat,area: frontend,priority: high" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Event Detail Screen conecta ao Socket.IO \`/events\` ao montar. Atualiza badge thermometer e lista de liveCheckins em tempo real.

## Critérios de Aceitação
- [ ] Conecta ao namespace \`/events\` ao entrar na tela
- [ ] Entra na room: \`emit('join', { eventId })\`
- [ ] Badge HOT/WARM/COLD atualiza sem reload ao receber \`thermometer:update\`
- [ ] Nova row aparece em liveCheckins ao receber \`checkin:new\`
- [ ] Desconecta ao sair da tela (useEffect cleanup)

## Depende de
#13 (WebSocket backend)")
echo "  ✓ criada: $N (WebSocket frontend)"

N=$(gh issue create --repo "$REPO" \
  --title "Venue Detail Screen integrada ao GET /venues/:venueId" \
  --label "feat,area: frontend,priority: medium" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Substituir dados mock da Venue Detail Screen por \`GET /venues/:venueId\`.

## Critérios de Aceitação
- [ ] Dados do venue vêm do backend
- [ ] Loading e estados de erro tratados
- [ ] Reviews listadas (se endpoint disponível)")
echo "  ✓ criada: $N (Venue Detail → API real)"

N=$(gh issue create --repo "$REPO" \
  --title "GitHub Actions: CI/CD — deploy automático em develop" \
  --label "chore,area: devops,priority: medium" \
  --milestone "Sprint 2 — Core Features" \
  --body "## Descrição
Workflow de deploy automático do backend no Railway/Render ao fazer merge em \`develop\`.

## Critérios de Aceitação
- [ ] Push em \`develop\` dispara deploy do backend automaticamente
- [ ] Deploy em \`main\` vai para ambiente de produção
- [ ] Notificação de falha no deploy visível no PR/commit")
echo "  ✓ criada: $N (CI/CD deploy)"

echo ""
echo "  ── Sprint 3: Polish & Launch ─────────────────────────"

N=$(gh issue create --repo "$REPO" \
  --title "POST /payments/checkout — criar Stripe Checkout Session" \
  --label "feat,area: backend,priority: medium" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Criar Stripe Checkout Session com preço do evento. Retornar \`sessionUrl\` para o app abrir em WebView.

## Critérios de Aceitação
- [ ] Cria sessão Stripe com \`eventId\` e \`quantity\`
- [ ] Retorna \`{ sessionUrl, sessionId }\`
- [ ] Salva Payment com \`status=pending\`
- [ ] \`success_url\` e \`cancel_url\` configurados")
echo "  ✓ criada: $N (Stripe Checkout)"

N=$(gh issue create --repo "$REPO" \
  --title "POST /payments/webhook — confirmar pagamento e criar ticket" \
  --label "feat,area: backend,priority: medium" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Receber evento \`payment_intent.succeeded\` do Stripe. Validar assinatura. Criar Ticket e atualizar Payment.

## Critérios de Aceitação
- [ ] Valida assinatura com \`stripe.webhooks.constructEvent\`
- [ ] Cria Ticket com \`code\` único e \`qrPayload\`
- [ ] Atualiza \`Payment.status = succeeded\`
- [ ] Idempotente: segundo webhook do mesmo evento não cria duplicata")
echo "  ✓ criada: $N (Stripe Webhook)"

N=$(gh issue create --repo "$REPO" \
  --title "GET /tickets — ingressos do usuário com dados do evento" \
  --label "feat,area: backend,priority: medium" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Retornar tickets do usuário autenticado com dados do evento aninhados.

## Critérios de Aceitação
- [ ] Lista tickets com \`eventTitle\`, \`venueName\`, \`startsAt\`
- [ ] Filtra por \`status\` (query param opcional)
- [ ] Ordena por \`startsAt\` desc")
echo "  ✓ criada: $N (GET /tickets)"

N=$(gh issue create --repo "$REPO" \
  --title "Fluxo de compra de ingresso no app (WebView Stripe)" \
  --label "feat,area: frontend,priority: medium" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Botão 'Comprar Ingresso' na Event Detail abre WebView com \`sessionUrl\` do Stripe.

## Critérios de Aceitação
- [ ] Botão visível apenas para eventos com ingresso pago
- [ ] WebView abre Stripe Checkout corretamente
- [ ] Retorno de sucesso: toast + atualiza aba Tickets
- [ ] Retorno de cancelamento: retorna para Event Detail sem erro")
echo "  ✓ criada: $N (Fluxo compra ingresso)"

N=$(gh issue create --repo "$REPO" \
  --title "Tickets Screen: QR code real vindo do banco" \
  --label "feat,area: frontend,priority: medium" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Tickets Screen consome \`GET /tickets\`. QR code renderiza \`qrPayload\` real de cada ticket.

## Critérios de Aceitação
- [ ] Lista vem do backend (sem mock)
- [ ] QR code usa \`qrPayload\` do banco via \`react-native-qrcode-svg\`
- [ ] Status do ticket exibido com cor (ACTIVE=verde, USED=cinza, CANCELLED=vermelho)
- [ ] Pull-to-refresh funcional")
echo "  ✓ criada: $N (Tickets QR real)"

N=$(gh issue create --repo "$REPO" \
  --title "PATCH /users/me — atualização de perfil" \
  --label "feat,area: backend,priority: low" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Permitir atualização de \`name\`, \`bio\`, \`avatarUrl\`, \`city\`, \`state\`.

## Critérios de Aceitação
- [ ] Validação Zod de campos opcionais
- [ ] Atualiza apenas campos enviados (partial update)
- [ ] Retorna user atualizado
- [ ] avatarUrl aceita URL externa")
echo "  ✓ criada: $N (PATCH /users/me)"

N=$(gh issue create --repo "$REPO" \
  --title "Profile Screen integrada ao backend (GET + PATCH /users/me)" \
  --label "feat,area: frontend,priority: low" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Profile Screen consome \`GET /users/me\` e permite editar nome, bio e cidade.

## Critérios de Aceitação
- [ ] Dados vêm do backend
- [ ] Edição com feedback de sucesso/erro
- [ ] Logout chama \`POST /auth/logout\` e limpa tokens do SecureStore")
echo "  ✓ criada: $N (Profile → API real)"

N=$(gh issue create --repo "$REPO" \
  --title "POST + GET /reviews — avaliações textuais de venues" \
  --label "feat,area: backend,priority: low" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Implementar endpoints de reviews textuais de venues.

## Critérios de Aceitação
- [ ] POST \`/reviews\` cria review com \`rating\` e \`content\`
- [ ] GET \`/reviews/venue/:venueId\` lista reviews paginadas
- [ ] Usuário só pode revisar venue que visitou (tem checkin)
- [ ] Ordenação por \`createdAt\` desc")
echo "  ✓ criada: $N (Reviews)"

N=$(gh issue create --repo "$REPO" \
  --title "Deploy backend em Railway/Render (produção)" \
  --label "chore,area: devops,priority: high" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Configurar deploy automático do backend. Configurar variáveis de ambiente de produção e banco MySQL de produção.

## Critérios de Aceitação
- [ ] Push em \`main\` dispara deploy automático
- [ ] Variáveis de ambiente configuradas no painel
- [ ] \`prisma migrate deploy\` roda no startup automaticamente
- [ ] Health check \`GET /health\` respondendo em produção
- [ ] Logs acessíveis no painel")
echo "  ✓ criada: $N (Deploy produção)"

N=$(gh issue create --repo "$REPO" \
  --title "EAS Build: build de produção do app Expo" \
  --label "chore,area: devops,priority: high" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Configurar \`eas.json\` e gerar build de produção para Android via Expo Application Services.

## Critérios de Aceitação
- [ ] \`eas.json\` com perfis \`development\` e \`production\` configurados
- [ ] Build de produção gera APK/AAB válido
- [ ] \`API_URL\` aponta para backend de produção no perfil prod
- [ ] README com instruções de como gerar o build")
echo "  ✓ criada: $N (EAS Build)"

N=$(gh issue create --repo "$REPO" \
  --title "Testes de integração: fluxos críticos" \
  --label "test,area: backend,priority: medium" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Escrever testes de integração para os fluxos críticos do MVP.

## Critérios de Aceitação
- [ ] Teste: registro + login retorna tokens válidos
- [ ] Teste: presence verify com coords válidas cria registro
- [ ] Teste: checkin após unlock timer é aceito
- [ ] Teste: checkin antes do unlock retorna 403
- [ ] Teste: webhook Stripe cria ticket e atualiza payment
- [ ] Banco de teste isolado (não polui banco de dev)")
echo "  ✓ criada: $N (Testes de integração)"

echo ""
echo "  ── Issues 'Already Done' (Frontend UI + Auth Backend) ─"

# Issues do que já foi implementado — criamos e fechamos imediatamente
create_and_close() {
  local title="$1" body="$2" milestone="$3"
  local num
  num=$(gh issue create --repo "$REPO" \
    --title "$title" \
    --label "feat,already done" \
    --milestone "$milestone" \
    --body "$body" | grep -o '[0-9]*$')
  gh issue close "$num" --repo "$REPO" --reason "completed" 2>/dev/null
  echo "  ✓ criada e fechada: #$num ($title)"
}

create_and_close \
  "Auth: POST /register, /login, /refresh, /logout" \
  "## Status\n✅ Implementado\n\nAutenticação completa com bcrypt + JWT + rotação de refresh token. Sessões persistidas no banco com suporte a revokedAt." \
  "Sprint 1 — Foundation"

create_and_close \
  "Auth: GET /users/me (rota protegida por JWT)" \
  "## Status\n✅ Implementado\n\nRetorna dados do perfil do usuário autenticado. Guard JWT via \`requireAuth\` middleware." \
  "Sprint 1 — Foundation"

create_and_close \
  "Prisma Schema: 10 models completos" \
  "## Status\n✅ Implementado\n\nUser, Session, Venue, Event, PresenceVerification, Checkin, Review, Ticket, Payment, com todos os enums e índices." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Splash / Welcome Screen" \
  "## Status\n✅ Implementado\n\nTela inicial com logo Moody e opções de login." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Login Screen com Auth Context" \
  "## Status\n✅ Implementado\n\nFormulário de login conectado ao Auth Context. Tokens armazenados via expo-secure-store." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Register Screen" \
  "## Status\n✅ Implementado\n\nFormulário de cadastro com validação Zod." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Auth Context + expo-secure-store" \
  "## Status\n✅ Implementado\n\nContexto de autenticação global com hooks. Tokens armazenados de forma segura." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Theme — tokens.ts + text.ts (design system)" \
  "## Status\n✅ Implementado\n\nSistema de design com paleta de cores, tipografia e tokens de espaçamento." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Vibe Selection Screen (bar / club / food)" \
  "## Status\n✅ Implementado\n\nSeleção de vibe com 3 opções. Armazena vibe selecionado para filtrar o feed." \
  "Sprint 1 — Foundation"

create_and_close \
  "Frontend: Discover Feed Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nLista de eventos com cards, badges HOT/FREE ENTRY e info de distância. Dados ainda mockados — integração real na Sprint 2." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Event Detail Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nDetalhe do evento com promoção, Tonight's Vibe, Live Check-ins e botão 'I'm Going Here'. Dados ainda mockados." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Venue Detail Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nDetalhe do venue com hero image e informações. Dados ainda mockados." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Presence Check Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nTela de verificação de presença com mapa de fundo e modal de confirmação. GPS ainda mockado." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Presence Verified + Timer Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nTela com badge 'Presence Verified', countdown timer visual e barra de progresso. Timer hardcoded em 30min." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Quick Check-in Form Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nFormulário com sliders/botões para crowded, vibe, promoActive, worthIt. Sem POST real ainda." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Camera Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nTela de câmera para foto de validação com botão de captura. Sem upload ainda." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Thanks Screen" \
  "## Status\n✅ Implementado\n\nTela de agradecimento após check-in com mensagem de feedback." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Live Now Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nFeed de eventos com termômetro ao vivo. Dados ainda mockados." \
  "Sprint 2 — Core Features"

create_and_close \
  "Frontend: Tickets Screen com QR Code (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nLista de ingressos com QR code via react-native-qrcode-svg. Dados ainda mockados." \
  "Sprint 3 — Polish & Launch"

create_and_close \
  "Frontend: Profile Screen (UI completa)" \
  "## Status\n✅ Implementado (UI)\n\nPerfil do usuário com avatar, stats e histórico. Dados ainda mockados." \
  "Sprint 3 — Polish & Launch"

echo ""
echo "  ── Issue especial: Melhorar Telas ────────────────────"

N=$(gh issue create --repo "$REPO" \
  --title "Melhorar telas: polish geral de UI/UX" \
  --label "feat,area: frontend,priority: low" \
  --milestone "Sprint 3 — Polish & Launch" \
  --body "## Descrição
Issue de melhoria contínua das telas existentes. À medida que o time usa o app com dados reais, documentar aqui os ajustes de UI/UX identificados.

## Melhorias mapeadas inicialmente

### Discover Feed
- [ ] Skeleton loading mais fiel ao layout dos cards
- [ ] Animação de entrada nos cards (fade-in ao scrollar)
- [ ] Empty state quando nenhum evento na cidade

### Event Detail
- [ ] Transição hero image com parallax ao scrollar
- [ ] Animação no badge HOT (pulse) quando thermometer = HOT
- [ ] Botão 'I'm Going Here' com haptic feedback

### Presence & Check-in
- [ ] Animação de sucesso ao verificar presença (confetti leve)
- [ ] Micro-animação no timer (segundos piscando)
- [ ] Feedback tátil ao enviar check-in

### Geral
- [ ] Skeleton screens em todas as telas com dados async
- [ ] Toast notifications padronizados (sucesso / erro / info)
- [ ] Tratamento de estado offline com banner de 'Sem conexão'
- [ ] Acessibilidade: labels em elementos interativos

## Como usar esta issue
Adicione comentários com novos problemas encontrados durante o desenvolvimento. Quebre em sub-issues se algum item virar tarefa maior.")
echo "  ✓ criada: $N (Melhorar telas)"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                    ✅ Setup completo!                    ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║  Criadas: ~32 issues ativas + ~20 issues fechadas (done) ║"
echo "║                                                          ║"
echo "║  Próximo passo:                                          ║"
echo "║  1. Abra o GitHub Project no browser                    ║"
echo "║  2. As issues já aparecem no board automaticamente       ║"
echo "║  3. Mova as issues de Sprint 1 da coluna Backlog         ║"
echo "║     para a coluna Sprint                                 ║"
echo "║  4. Atribua as issues para os devs do time               ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
