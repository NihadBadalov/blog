"use client";

import Link from "next/link";
import "./home.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<{ id: number; contents: string; publication_date: Date; }[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      const fetchedArticles = await response.json();
      console.log('fetched articles', fetchedArticles);

      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  function deletePost(id: number) {
    fetch(`/api/article/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log('sent');
      router.refresh();
    }).catch(() => {
      console.log('Couldn\'t delete the blog');
    });
  }

  return (
    <>
      <div className="wrapper">
        <div className="heading">
          <h1>Blog</h1>
          <Link href="/create">publish a blog</Link>
        </div>
        <main className="center articles">
          {articles.toReversed().map(a => {
            return (
              <div key={a.id} className={`article article-${a.id}`}>
                <p className="contents">{a.contents}</p>
                <p className="date">{a.publication_date as unknown as string}</p>
                <button type="button" onClick={() => deletePost(a.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}
