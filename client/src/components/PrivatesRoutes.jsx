import { useState, useEffect } from "react";
import { informationUser } from "../redux/actions";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

export const isAuthenticated = () => {
  const user = informationUser();
  return user;
}

const PrivatesRoutes = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const checkAuthentication = () => {
      const userLogin = isAuthenticated();
      setUser(userLogin);
    };
    checkAuthentication();
  }, []);

  if (user === null) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  if (!user || !user.user) {
    return <Navigate to='/login' />
  };
  return (
    <Outlet />
  );
};


export default PrivatesRoutes;