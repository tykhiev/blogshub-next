import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function withAuth(WrappedComponent) {
  return function Authenticated(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthorized(true);
        } else {
          router.replace("/signin");
        }
      };
      checkAuth();
    }, [router]); 

    return <WrappedComponent {...props} isAuthorized={isAuthorized} />;
  };
}

export default withAuth;