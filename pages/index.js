import Head from 'next/head';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Link from 'next/link'
import Layout from './components/layout';
import LayoutUnAuthorized from './components/layout-unauthorized';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Creative Landing Page</title>
        <meta name="description" content="A creative Next.js landing page with Tailwind CSS and DaisyUI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUnAuthorized>

      <main>
      <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">BlogsHub</h1>
          <p className="text-gray-600 mb-6">This is where you can create your blogs posts.</p>
          <div className="flex items-center justify-between mb-6">
            <Link href={'/signin'} className="btn btn-primary flex items-center">
              <FaSignInAlt className="mr-2" />
              Sign In
            </Link>
            <Link href={'/signup'} className="btn btn-outline btn-info flex items-center">
              <FaUserPlus className="mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      </div>  
      </main>
      </LayoutUnAuthorized>
    </>
  );
}