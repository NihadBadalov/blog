'use client'
import { createArticle } from "@/app/actions";
import "./../create.scss";
import Link from "next/link";

export default async function Home() {
  async function onSubmit(formData: FormData) {
    await createArticle(
      formData.get('title') as unknown as string,
      formData.get('contents') as unknown as string,
    );
  }

  return (
    <>
      <div className="wrapper">
        <div className="heading">
          <h1>Create a Blog</h1>
          <Link href="/">back</Link>
        </div>
        <form className="articles" action={onSubmit}>
          <input name="title" type="text" placeholder="Write your blog title..." />
          <input name="contents" type="text" placeholder="Write your blog content..." />
          <main className="center submission">
            <button type="submit">Submit</button>
          </main>
        </form>
      </div>
    </>
  );
}
