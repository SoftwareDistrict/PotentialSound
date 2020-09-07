import React from "react";

const Login = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Potential Sound</h1>
      <div className="Googlelogin">
        <a href="/google">
          <button
            className="GoogleButton"
            style={{
              fontSize: "18px",
              border: "none",
              backgroundColor: "#037bfc",
              width: "250px",
              height: "60px",
              textAlign: "right",
              padding: "10px",
              marginBottom: "600px",
            }}
          >
            <img
              src="https://tinyurl.com/y6kf4vx4"
              style={{
                height: "50px",
                width: "50px",
                position: "absolute",
                top: "120px",
                left: "20px",
              }}
            />
            Sign in with Google
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
