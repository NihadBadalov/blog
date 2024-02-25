import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insert(title: string, contents: string) {
  return prisma.article.create({
    data: {
      contents: contents,
      publication_date: new Date(),
    },
  });
}

type ArticleFindManyParams = Parameters<typeof prisma.article.findMany>[0];
export async function select(options: ArticleFindManyParams) {
  return prisma.article.findMany();
}

/* main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); */
