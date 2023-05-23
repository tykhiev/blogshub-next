import Head from "next/head";
import Layout from "./components/layout";
import LayoutUnAuthorized from "./components/layout-unauthorized";

export default function About() {
  return (
    <>
      <Head>
        <title>About BlogsHub</title>
        <meta
          name="description"
          content="Learn about BlogsHub - a blog posting platform built with Prisma, NestJS, NextJS, and Postgresql"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="container mx-auto px-4">
          <div className="my-8">
            <h1 className="text-3xl font-bold mb-4">About BlogsHub</h1>
            <p className="text-lg mb-4">
              BlogsHub is a blog posting platform built with Prisma, NestJS,
              NextJS, and Postgresql. Our goal is to provide a simple, yet
              powerful platform for bloggers to create and share their content
              with the world.
            </p>
            <p className="text-lg mb-4">
              With BlogsHub, you can easily create your own blog, write and
              publish posts, and connect with other bloggers. Our intuitive user
              interface and powerful features make it easy to manage your blog
              and grow your audience.
            </p>
            <p className="text-lg mb-4">
              Our team is dedicated to providing the best possible experience
              for our users. We are constantly updating and improving our
              platform to ensure that it meets the needs of bloggers everywhere.
            </p>
            <p className="text-lg mb-4">
              Thank you for choosing BlogsHub - we can&apos;t wait to see what you
              create!
            </p>
          </div>
        </main>
      </Layout>
    </>
  );
}
