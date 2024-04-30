const { faker } = require('@faker-js/faker');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const userEventData = Array.from(
  { length: 100 },
  () => ({
    title: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.sentence({ min: 1, max: 8 }),
    notes: faker.helpers.maybe(faker.lorem.sentence, { probability:1 }),
    startDate: faker.helpers.maybe(faker.date.recent, { probability:1 }),
    endDate: faker.helpers.maybe(faker.date.recent, { probability:1 }),
    location: faker.helpers.maybe(faker.location.city, { probability:1 }),
    category: faker.helpers.maybe(
      () =>
        faker.helpers.arrayElement([
  "MUSIC",
  "SPORTS",
  "ARTS",
  "EDUCATION",
  "OTHER",
        ]),
        { probability: 1 },
    ),
    organizerId: "cea49951-0f85-4ed5-b8b3-b4103e1921bf",
  }),
);
async function main() {
  console.log(`Start seeding ...`);
  const events = await prisma.event.createMany({
    data: userEventData,
    skipDuplicates: true,
  });
  console.log(`Seeded ${events.count} events.`);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });