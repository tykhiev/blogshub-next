import Head from "next/head";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Layout from "./components/layout";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handlePageSizeChange(newPageSize) {
    setPage(1);
    setPageSize(newPageSize);
  }

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const id = localStorage.getItem("id");
        console.log(id);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/blogs/${id}?page=${page}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await res.json();
        console.log(data.data);
        setBlogs(data.data);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } catch (err) {
        console.error(err);
      }
    }
    fetchBlogData();
  }, [page, pageSize]);

  return (
    <>
      <Head>
        <title>Blogs | My Website</title>
      </Head>
      <Layout>
        <div className="pt-8 pb-8 min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4">Blogs You Posted</h1>
            <p className="text-gray-600 mb-6">
              This is where you can create your blogs posts.
            </p>
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="py-2 pr-8 pl-4 block w-full rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:outline-none"
                  placeholder="Search blog posts"
                />
                <button className="absolute top-0 right-0 mt-4 mr-3">
                  <FaSearch />
                </button>
              </div>
              <Link
                href={"/create-a-blog"}
                className="btn btn-primary flex items-center"
              >
                Create Blog
              </Link>
            </div>
            <ul className="space-y-2">
              {blogs?.map((blog) => (
                <li key={blog.id} className="py-2">
                  <Link href={`/blogs/${blog.id}`} passHref legacyBehavior>
                    <a
                      className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out"
                      data-token={localStorage.getItem("token")}
                    >
                      <div className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out">
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-2">{blog.content}</p>
                        <p className="text-gray-400 text-sm mb-2">
                          {"Created on " +
                            new Date(blog.createdAt).toLocaleDateString() +
                            " by " +
                            blog.author.username}
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6">
              <div className="flex items-center">
                <label htmlFor="pageSize" className="mr-2">
                  Show:
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(e.target.value)}
                  className="border border-gray-400 rounded-md p-1"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <span>Prev</span>
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-2"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <span>Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
