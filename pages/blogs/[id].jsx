import Head from "next/head";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Blog() {
  const [author, setAuthor] = useState(null);
  const [blog, setBlog] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchAuthorData() {
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
        setAuthor(blogData.blog.author);
        setBlog(blogData.blog);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) {
      fetchAuthorData();
    }
  });

  function handleEditClick() {
    router.push(`/blogs/edit/${id}`);
  }

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/blogs/blog/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
    router.push(`/myblogs`);
  };

  return (
    <>
      <Head>
        <title> My Website</title>
      </Head>
      <Layout>
        <div className="pt-8 pb-8 min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <p className="text-gray-400 text-sm mb-4">
              {"Created on " +
                new Date(blog.createdAt).toLocaleDateString() +
                " by " +
                (author ? blog.author.username : "")}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
