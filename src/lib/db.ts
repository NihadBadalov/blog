import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertBlog(contents: string) {
  return prisma.article.create({
    data: {
      contents: contents,
      publication_date: new Date(),
    },
  });
}

export async function deleteBlog(articleId: number) {
  return prisma.article.delete({
    where: {
      id: articleId,
    },
  });
}

type ArticleFindManyParams = Parameters<typeof prisma.article.findMany>[0];
export async function selectBlog(options: ArticleFindManyParams) {
  return prisma.article.findMany(options);
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
