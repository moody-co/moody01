import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpando o banco de dados (Reset)...');
  await prisma.payment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.checkin.deleteMany();
  await prisma.review.deleteMany();
  await prisma.presenceVerification.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌱 Iniciando o plantio de dados...');

  // ================= 1. USUÁRIOS =================
  const user1 = await prisma.user.create({
    data: {
      name: 'Lucas Guerra',
      username: 'lucasguerra',
      email: 'lucas@email.com',
      city: 'São José dos Campos',
      state: 'SP',
      avatarUrl: 'https://i.pravatar.cc/150?u=lucas',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Ana Clara',
      username: 'anaclara',
      email: 'ana@email.com',
      city: 'São José dos Campos',
      state: 'SP',
      avatarUrl: 'https://i.pravatar.cc/150?u=ana',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Pedro Thiago',
      username: 'pedrot',
      email: 'pedro@email.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=pedro',
    },
  });

  // ================= 2. ESTABELECIMENTOS (VENUES) =================
  const venueJockers = await prisma.venue.create({
    data: {
      name: "Jocker's Bar",
      subtitle: 'Música ao vivo e cerveja gelada',
      category: 'BAR',
      addressLine: 'Av. São João, 1234 - Jd Aquarius',
      city: 'São José dos Campos',
      state: 'SP',
      lat: -23.1890,
      lng: -45.8833,
      heroImageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop',
    },
  });

  const venueBeco = await prisma.venue.create({
    data: {
      name: "O Beco's Bar",
      subtitle: 'O point universitário',
      category: 'BAR',
      addressLine: 'Rua das Flores, 45 - Vila Ema',
      city: 'São José dos Campos',
      state: 'SP',
      lat: -23.2035, // Coordenadas ligeiramente diferentes para testar GPS
      lng: -45.8911,
      heroImageUrl: 'https://images.unsplash.com/photo-1436018626274-89acd1d6ec9d?q=80&w=1000&auto=format&fit=crop',
    },
  });

  const venueNeon = await prisma.venue.create({
    data: {
      name: 'The Neon Lounge',
      subtitle: 'A melhor balada eletrônica da região',
      category: 'CLUB',
      addressLine: 'Av. Cassiano Ricardo, 900',
      city: 'São José dos Campos',
      state: 'SP',
      lat: -23.2100,
      lng: -45.8800,
      heroImageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
    },
  });

  const venueBurger = await prisma.venue.create({
    data: {
      name: 'Moody Burger Station',
      subtitle: 'Artesanal e suculento',
      category: 'RESTAURANT',
      addressLine: 'Av. Andrômeda, 300 - Jd Satélite',
      city: 'São José dos Campos',
      state: 'SP',
      lat: -23.2200,
      lng: -45.8950,
      heroImageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
    },
  });

  // ================= 3. EVENTOS (Diferentes datas) =================
  const now = new Date();
  
  // Evento Bombando Hoje (Balada)
  const eventNeon = await prisma.event.create({
    data: {
      venueId: venueNeon.id,
      title: 'The Neon Party',
      city: 'São José dos Campos',
      area: 'Jardim Aquarius',
      promoTitle: 'Entrada VIP até 23h',
      promoText: 'Chegue cedo e não pague entrada.',
      startsAt: new Date(now.setHours(22, 0, 0, 0)),
      endsAt: new Date(now.setHours(28, 0, 0, 0)),
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    },
  });

  // Evento Amanhã (Bar)
  const eventBeco = await prisma.event.create({
    data: {
      venueId: venueBeco.id,
      title: 'White Party',
      city: 'São José dos Campos',
      area: 'Vila Ema',
      promoTitle: '2-for-1 Drinks',
      promoText: 'Válido para todas as bebidas a noite toda.',
      startsAt: new Date(new Date().setDate(now.getDate() + 1)), // Amanhã
      endsAt: new Date(new Date().setDate(now.getDate() + 2)),
      imageUrl: 'https://images.unsplash.com/photo-1511158652316-24e528151048?q=80&w=1000&auto=format&fit=crop',
    },
  });

  // ================= 4. CHECK-INS E REVIEWS (O Termômetro) =================
  
  // Fazendo o The Neon Lounge ficar "HOT" 🔥
  await prisma.checkin.createMany({
    data: [
      {
        userId: user1.id,
        venueId: venueNeon.id,
        eventId: eventNeon.id,
        crowded: 'FULL',
        vibe: 'LIVELY',
        promoActive: 'YES',
        worthIt: 'YES',
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 min atrás
      },
      {
        userId: user2.id,
        venueId: venueNeon.id,
        eventId: eventNeon.id,
        crowded: 'MEDIUM',
        vibe: 'LIVELY',
        promoActive: 'YES',
        worthIt: 'YES',
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min atrás
      },
      {
        userId: user3.id,
        venueId: venueNeon.id,
        eventId: eventNeon.id,
        crowded: 'FULL',
        vibe: 'OK',
        promoActive: 'YES',
        worthIt: 'YES',
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 min atrás
      }
    ]
  });

  // Fazendo o Burger Station ficar "WARM" 😊 (Sem evento específico, só o local)
  await prisma.checkin.create({
    data: {
      userId: user1.id,
      venueId: venueBurger.id,
      crowded: 'MEDIUM',
      vibe: 'OK',
      promoActive: 'NO',
      worthIt: 'YES',
      createdAt: new Date(),
    }
  });

  // Adicionando Avaliações de Texto (Reviews)
  await prisma.review.create({
    data: {
      userId: user1.id,
      venueId: venueJockers.id,
      rating: 5,
      content: 'Lugar excelente! A banda que tocou sexta-feira foi sensacional. Cerveja super gelada e atendimento rápido.',
    }
  });

  console.log('✅ Diversidade de dados inserida no Supabase!');
  console.log(`📊 Total inserido: 3 Usuários, 4 Venues, 2 Eventos, 4 Check-ins, 1 Review.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });