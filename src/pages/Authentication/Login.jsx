import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const testUser = {
    email: "theMarauders@gmail.com",
    password: "FortunaMajor",
  };

  function setUserData(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    sendLoginData(loginData);
  };

  const sendLoginData = async (loginData) => {
    try {
      const response = await axios.post("/api/auth/login", loginData);
      if (response.status === 200) {
        const { data } = response;
        const userToken = data.encodedToken;
        localStorage.setItem("userToken", userToken);
        navigate("/");
      }
    } catch (error) {
      setLoginError("An error occurred.");
      console.log("error:", error);
    }
  };

  return (
    <div className="page-body">
      <section className="login-container shadow">
        <h2 className="container-title">Login</h2>
        <form className="login-details" onSubmit={handleLogin}>
          <div className="labelled-input label-top username">
            <label className="label"> Email ID</label>
            <input
              type="email"
              name="email"
              placeholder="jane.doe@email.com"
              onChange={setUserData}
            />
          </div>
          <div className="labelled-input label-top password">
            <label className="label"> Password </label>
            <span
              className="toggle-login-pwd material-icons material-icons-outlined"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? "visibility_off" : "visibility"}
            </span>
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="************"
              onChange={setUserData}
            />
          </div>
          <div className="auth-opts">
            <div className="checkbox-btn remember-me">
              <input type="checkbox" name="checkbox" />
              <label className="label">Remember Me</label>
            </div>
            <a href="#" className="forgot-pwd">
              Forgot Password?
            </a>
          </div>
          <div className="auth-btns">
            <button className="btn link-btn-outline login-btn">Login</button>
            <button
              className="btn link-btn-outline login-btn"
              onClick={() => sendLoginData(testUser)}
            >
              Test User
            </button>
          </div>
        </form>
        <br />
        {loginError && <p className="val-error"> {loginError} </p>}
        <hr />
        <br />
        <div className="new-user">
          <Link to="/signup" className="link-in-btn p-lg">
            Create New Account
          </Link>
        </div>
      </section>
    </div>
  );
}
