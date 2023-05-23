import Head from "next/head";
import Link from "next/link";

export default function LayoutUnAuthorized({ children }) {
  return (
    <>
      <Head>
        <title>BlogsHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 md:px-0">
          <div className="flex items-center justify-between">
            <Link href="/">
              <p className="text-xl font-bold text-white px-8">BlogsHub</p>
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
              <Link href="/about">
                <p className="text-gray-300 mx-4 hover:text-white">About</p>
              </Link>
              <Link href="/contact">
                <p className="text-gray-300 mx-4 hover:text-white">Contact</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <div>

      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 md:px-0 ">
          <div className="text-center text-white">
            &copy; 2023 BlogsHub. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
    </>
  );
} 