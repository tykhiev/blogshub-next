import Head from 'next/head';
import Layout from './components/layout';
import LayoutUnAuthorized from './components/layout-unauthorized';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact the BlogsHub team with any questions or feedback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUnAuthorized>
        <main className="container mx-auto px-4">
          <div className="my-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg mb-4">
              Have a question or feedback about BlogsHub? We&apos;d love to hear from you! Please use the form below to contact our team and we will get back to you as soon as possible.
            </p>
            <form className="mb-8">
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2">Name</label>
                <input type="text" id="name" className="form-input w-full" placeholder="Enter your name" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">Email</label>
                <input type="email" id="email" className="form-input w-full" placeholder="Enter your email address" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block font-bold mb-2">Message</label>
                <textarea id="message" className="form-textarea w-full h-32" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className="text-lg">
              You can also reach us directly at <a href="mailto:contact@blogshub.com" className="underline">contact@blogshub.com</a>.
            </p>
          </div>
        </main>
      </LayoutUnAuthorized>
    </>
  );
}