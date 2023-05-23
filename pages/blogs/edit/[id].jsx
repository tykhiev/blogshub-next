import Head from "next/head";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BlogEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/blogs/blog/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const blogData = await res.json();
        setTitle(blogData.blog.title);
        setContent(blogData.blog.content);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/blogs/blog/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ title, content }),
        }
      );
      if (res.ok) {
        router.push(`/blogs/${id}`);
      } else {
        setError("Failed to update blog post");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update blog post");
    }
  }

  return (
    <>
      <Head>
        <title>Edit Blog Post</title>
      </Head>
      <Layout>
        <div className="pt-8 pb-8 min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4">Edit Blog Post</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="content"
                  placeholder="Enter content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => router.push(`/blogs/${id}`)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
