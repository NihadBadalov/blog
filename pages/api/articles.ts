import { selectBlog } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const blogs = await selectBlog({
    select: {
      id: true,
      contents: true,
      publication_date: true,
    }
  });

  const sanitizedLogs =
    blogs.map(blog => {
      return {
        ...blog,
        publication_date: blog.publication_date.toLocaleDateString(),
      };
    });

  res.status(200).json(sanitizedLogs);
}
