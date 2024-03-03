'use client';
import { createArticle } from "../actions";
import "@/app/create.scss";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    await createArticle(
      formData.get('contents') as unknown as string,
    );
    redirect('/');
  }

  window.addEventListener('keypress', e => {
    console.log(e.key);
    if (e.key == 'esc') {
    }
  });

  return (
    <>
      <div key-id="create-page" className="wrapper create">
        <div className="wrapper_inner">
          <div className="heading">
            <h1>Create a Blog</h1>
            <Link href="/">back</Link>
          </div>
          <form className="create-articles" action={onSubmit}>
            <input name="contents" type="text" placeholder="Write your blog content..." autoFocus={true} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
