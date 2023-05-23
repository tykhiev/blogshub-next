import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./components/layout";
import Link from "next/link";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // submit form data to your API or backend server
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/blogs/create-blog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, content }),
      }
    );
    if (res.status === 201 || res.status === 200) {
      // redirect to the new created blog post
      const data = await res.json();
      console.log(data);
      router.push(`/myblogs`);
    } else {
      console.error("Failed to create blog post");
    }
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("user"));
    setUser(local);
  }, []);

  return (
    <>
      <Head>
        <title>Create a New Blog Post</title>
        <meta
          name="description"
          content="Create a new blog post in Blogs Zone"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-whote leading-tight focus:outline-none focus:shadow-outline"
                  id="content"
                  rows="10"
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!title || !content}
                >
                  Create
                </button>

                <Link href={"/blogs"} className="btn btn-outline btn-info">
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
