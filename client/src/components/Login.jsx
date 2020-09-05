import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    let menu = document.getElementById("menu");
    menu.style.display = "none";
  }, []);

  return (
    <div>
      <h1>Welcome to Potential Sound</h1>
      <div className="Googlelogin">
        <a href="/google">
          <button className="GoogleButton">Sign in with Google</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
