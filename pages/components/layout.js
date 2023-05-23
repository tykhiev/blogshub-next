import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  }
  return (
    <>
      <Head>
        <title>BlogsHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 md:px-0">
          <div className="flex items-center justify-between">
            <Link href="/blogs">
              <p className="px-8 text-xl font-bold text-white">BlogsHub</p>
            </Link>
            <button
              className="text-white focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                />
              </svg>
            </button>
            <div className="hidden md:flex md:items-center">
              <Link href="/myblogs">
                <p className="text-gray-300 mx-4 hover:text-white">My Blogs</p>
              </Link>
              <Link href="/blogs">
                <p className="text-gray-300 mx-4 hover:text-white">Blogs</p>
              </Link>
              <Link href="/about-us">
                <p className="text-gray-300 mx-4 hover:text-white">About</p>
              </Link>
              <Link href="/contact-us">
                <p className="text-gray-300 mx-4 hover:text-white">Contact</p>
              </Link>
              <Link href="/chat">
                <p className="text-gray-300 mx-4 hover:text-white">Chat</p>
              </Link>
              <Link href="/" onClick={handleSignOut}>
                <p className="text-gray-300 mx-4 hover:text-white">Sign Out</p>
              </Link> 
              
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 md:px-0">
          <div className="text-center text-white">
            &copy; 2023 My Website. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}