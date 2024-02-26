'use server'

import { insertBlog } from "@/lib/db";

export async function createArticle(contents: string) {
  return insertBlog(contents);
}
