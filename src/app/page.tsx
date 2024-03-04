"use client";

import Link from "next/link";
import "@/app/home.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<{ id: number; contents: string; publication_date: Date; }[]>([]);


  let fetchedArticles = undefined;

  const fetchArticles = async () => {
    const response = await fetch('/api/articles');
    const fetchedArticles = await response.json();

    setArticles(fetchedArticles.reverse());
  };

  useEffect(() => {
    router.prefetch('/');

    fetchArticles();

    window.addEventListener('keydown', e => {
      if (e.key == 'c') {
        router.push('/create');
      }
    });
  }, [router, fetchedArticles]);


  function deletePost(id: number) {
    fetch(`/api/article/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchArticles();
    }).catch((e) => {
      console.error('Couldn\'t delete the blog', e);
    });
  }


  return (
    <>
      <div key-id="main-page" className="wrapper home">
        <div className="wrapper_inner">
          <div className="heading">
            <h1>Blog</h1>
            <Link href="/create">publish a blog</Link>
          </div>
          <main key-id="articles" className="center articles">
            {articles.map(a => {
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
      </div>
    </>
  );
}

function Loading() {
  return (
    <p>Loading...</p>
  );
}
