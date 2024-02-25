'use server'

import { insert } from "@/lib/db"

 
export async function createArticle(title: string, contents: string) {
  return insert(title, contents);
}
