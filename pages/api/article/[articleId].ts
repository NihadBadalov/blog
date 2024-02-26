import { deleteBlog } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { articleId } = req.query;
  
  if (!articleId || Number.isNaN(articleId)) {
    res.status(400).end('Bad Request');
  }

  deleteBlog(+articleId!);
  res.end('Article deleted');
}
