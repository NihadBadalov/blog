import { select } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import "./home.scss";

export default async function Home() {
  const articles = await select({
    select: {
      id: true,
      contents: true,
      publication_date: true,
    }
  });

  return (
    <>
      <div className="wrapper">
        <div className="heading">
          <h1>Blog</h1>
          <Link href="/create">publish a blog</Link>
        </div>
        <main className="center articles">
          {...articles.toReversed().map(a => {
            return (
              <div className={`article article-${a.id}`}>
                <div className="heading">
                  <p className="title">{a.title}</p>
                  <p className="date">{a.publication_date.toLocaleDateString()}</p>
                </div>
                <p className="contents">{a.contents}</p>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}
