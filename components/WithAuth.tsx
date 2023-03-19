import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { username, isLoginPopupOpen } = useAppSelector(
      (state: any) => state.acctData
    );

    useEffect(() => {
      if (!username) {
        router.push("/login");
      }
    }, [username, router]);

    if (username) {
      return <WrappedComponent {...props} />;
    } else {
      return null; // or render a loading spinner or a message saying "redirecting to login page"
    }
  };

  return Wrapper;
};

export default WithAuth;
