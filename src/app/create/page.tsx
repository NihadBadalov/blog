'use client'
import { createArticle } from "../actions";
import "../create.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    await createArticle(
      formData.get('contents') as unknown as string,
    );
    router.push('/');
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
