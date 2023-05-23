import Layout from "./components/layout";

export default function Error({ statusCode, message }) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold mb-4">
          {statusCode} - {message}
        </h1>
        {statusCode === 401 && (
          <p className="text-gray-600 mb-8">
            You are not authorized to access this page.
          </p>      
        )}
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Reload Page
        </button>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  let statusCode, message;
  if (res) {
    statusCode = res.statusCode;
    message = res.statusMessage;
  } else if (err) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = 500;
    message = "An unhandled runtime error occurred";
  }
  return { statusCode, message };
};