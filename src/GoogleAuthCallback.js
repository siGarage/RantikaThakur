import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function GoogleAuthCallback() {
  const [auth, setAuth] = useState();
  const location = useLocation();
  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    // if (user) {
      axios({
        method: 'GET',
        url: `http://localhost:1337/api/auth/google/callback${search}`,
      })
        .then((res) => console.log(res.data))
        .then(setAuth)
  }, [location]);

  console.log(auth, "auth");

  return (
    <div>
      {auth && (
        <>
          <div>Jwt: {auth?.jwt}</div>
          <div>User Id: {auth?.id}</div>
        </>
      )}
    </div>
  );
}

export default GoogleAuthCallback;
