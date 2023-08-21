import React, { useEffect, useState } from "react";
import { checkAccessToken, refreshAuthToken } from "../utils/Auth";

const useAuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginCheck = async () => {
      const isAccess = await checkAccessToken();
      if (isAccess) {
        setIsLoggedIn(true);
      } else {
        const isRefreshed = await refreshAuthToken();
        if (isRefreshed) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };
    loginCheck();
  }, []);

  return isLoggedIn;
};

export default useAuthCheck;
