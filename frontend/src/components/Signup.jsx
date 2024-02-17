import { useState } from "react";
import "../styles/signup.css";
import { FcGoogle } from "react-icons/fc";

export const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePost = fetch(`http://localhost:3000/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });
  return (
    <div
      className="container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/image_75.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="signup"
        style={{
          height: "70vh",
          width: "60vw",

          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          backgroundSize: "cover",

          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="signup-form"
          style={{
            backgroundColor: "white",
            width: "50vh",
            height: "70vh",
            border: "1px grey",
            borderRadius: "20px",
            backgroundImage: "url(/image_9.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="signup-form"
          style={{
            backgroundColor: "white",
            width: "80vh",
            height: "70vh",
            border: "1px solid grey",
            justifyContent: "center",
            borderRadius: "20px",
            transform: "translateX(-40px)",
          }}
        >
          <div
            className="signup-header"
            style={{
              padding: "80px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Create Account</h2>
            <form
              onSubmit={handlePost}
              className="form"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <label className="label">
                <input
                  className="input"
                  type="text"
                  placeholder="Full Name"
                  name="username"
                  onChange={handleChange}
                />
              </label>
              <label className="label">
                <input
                  type="text"
                  placeholder="Email"
                  className="input"
                  name="email"
                  onChange={handleChange}
                />
              </label>
              <label className="label">
                <input
                  type="text"
                  placeholder="Password"
                  className="input"
                  name="password"
                  onChange={handleChange}
                />
              </label>
              <label className="label">
                <input
                  type="text"
                  placeholder="Confirm Password"
                  className="input"
                />
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "12.5px",
                  justifyContent: "center",
                  fontWeight: "400",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    height: "15px",
                    width: "15px",
                  }}
                />
                <p>
                  By creating an account you agree to our Terms and Privacy
                  Policy
                </p>
              </div>
            </form>
            <button type="submit" className="btn">
              Create Account
            </button>
            <p style={{ textAlign: "center", marginTop: "15px" }}>Or</p>

            <div className="social">
              <p style={{ display: "flex", gap: "7px" }}>
                <FcGoogle size={20} />
                signup with Google
              </p>
              <p style={{ display: "flex", gap: "7px" }}>
                <img src="../fb.svg" alt="" />
                signup with Facebook
              </p>
            </div>
            <div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "40px",
                  fontSize: "12.5px",
                }}
              >
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
