# Moody 

O **Moody** é uma plataforma focada em experiências de vida noturna e eventos, permitindo que usuários descubram locais (venues), acompanhem o status de lotação e "vibe" em tempo real, comprem ingressos e realizem check-ins verificados via geolocalização.

## 🚀 Tecnologias

O projeto utiliza uma arquitetura moderna com foco em performance e tipagem robusta:

### Backend

* **Fastify**: Framework web focado em baixo overhead e máxima velocidade.
* **Prisma ORM**: Gerenciamento de banco de dados MySQL com total segurança de tipos.
* **Zod**: Validação de esquemas e contratos de dados.
* **JWT (JSON Web Token)**: Autenticação segura entre cliente e servidor.
* **Bcryptjs**: Hash de senhas para segurança de dados sensíveis.

### Mobile (Native)

* **React Native & Expo**: Desenvolvimento nativo multiplataforma (iOS/Android/Web).
* **Expo Router**: Navegação baseada em arquivos.
* **Lucide React Native / Expo Symbols**: Ícones e identidade visual.
* **React Native Reanimated**: Animações fluidas de interface.

---

## 🛠️ Funcionalidades Principal

### Para Usuários

* **Descoberta**: Explore locais como Clubes, Bares e Restaurantes através de categorias.
* **Status em Tempo Real (Crowd & Vibe)**: Veja se um local está vazio, médio ou cheio, e qual o nível da "vibe" no momento (Low, OK, Lively).
* **Ingressos (Tickets)**: Compra e visualização de ingressos com QR Code dinâmico.
* **Check-in & Presença**: Sistema de verificação de presença em eventos para desbloquear funcionalidades exclusivas.
* **Avaliações**: Deixe reviews sobre suas experiências nos locais visitados.

---

## 🏗️ Estrutura do Banco de Dados

O modelo de dados (Prisma) é composto por:

* **User & Session**: Gestão de perfil, autenticação e tokens de renovação.
* **Venue**: Cadastro de estabelecimentos com localização geográfica (Lat/Lng).
* **Event**: Eventos específicos vinculados a estabelecimentos.
* **Checkin**: Registros de status enviados pelos usuários sobre o local.
* **Ticket & Payment**: Fluxo de compra e confirmação de ingressos.

---

## 🔧 Como Iniciar

### Backend

1. Entre na pasta `backend`.
2. Instale as dependências: `npm install`.
3. Configure o arquivo `.env` com sua `DATABASE_URL` (MySQL) e `JWT_SECRET`.
4. Rode as migrações: `npm run prisma:migrate`.
5. Inicie o servidor: `npm run dev`.

### Mobile

1. Entre na pasta `moody-native`.
2. Instale as dependências: `npm install`.
3. Inicie o Expo: `npx expo start`.

---

## 🛣️ Endpoints da API (Resumo)

* `/auth`: Registro e Login de usuários.
* `/venues`: Listagem e detalhes de locais.
* `/events`: Agenda de eventos.
* `/checkins`: Envio de status de ambiente.
* `/tickets`: Gerenciamento de ingressos comprados.

---
