"use client";

import Link from "next/link";
import "@/app/home.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<{ id: number; contents: string; publication_date: Date; }[]>([]);


  // Fetching articles
  const fetchArticles = async () => {
    const response = await fetch('/api/articles');
    const fetchedArticles = await response.json();

    setArticles(fetchedArticles.reverse());
  };

  useEffect(() => {
    fetchArticles();

    router.prefetch('/');
  }, [router]);

  useEffect(() => {
    // Keybinds handling
    let deletePressed = '';
    function handleKeybind(e: KeyboardEvent) {
      switch (e.key) {
        case 'c':
          router.push('/create');
          break;

        case 'd':
          if (deletePressed.startsWith('d')) return;
          deletePressed += 'd';
          break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          deletePressed += e.key;
          break;

        case 'Enter':
          if (!deletePressed.startsWith('d')) return;
          if (Number.isNaN(deletePressed.slice(1))) return;


          const postToDeletePosition = +deletePressed.slice(1);
          let postToDeleteId;
          for (let i = 0; i < articles.length; i++) {
            if (postToDeletePosition - 1 === i) {
              postToDeleteId = articles[i].id;
              break;
            }
          }

          if (!postToDeleteId) return;

          deletePost(postToDeleteId);
          break;

        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeybind);

    return () => {
      window.removeEventListener('keydown', handleKeybind);
    }
  }, [articles]);


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
            {!articles.length
                ? (<p>Loading...</p>)
                : articles.map(a => {
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
