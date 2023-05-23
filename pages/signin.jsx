import Head from "next/head";
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "./components/layout";
import LayoutUnAuthorized from "./components/layout-unauthorized";

export default function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    console.log(res.status, json);
    if (res.ok) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      localStorage.setItem("id", json.user.id);
      router.push("/blogs");
    } else {
      alert("Bad credentials");
    }
  }

  return (
    <>
      <Head>
        <title>Sign In to BlogsHub</title>
        <meta
          name="description"
          content="Sign in to Blogs Zone to create and share your blog posts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUnAuthorized>
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4">Sign In to BlogsHub</h1>
            <p className="text-gray-600 mb-6">
              Create and share your blog posts.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="btn btn-primary" type="submit">
                  Sign In
                </button>
                <Link href="/signup">
                  <button className="btn btn-outline btn-info flex items-center">
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </LayoutUnAuthorized>
    </>
  );
}
