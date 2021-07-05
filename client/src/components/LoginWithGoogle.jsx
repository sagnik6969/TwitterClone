import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./loginwithgoogle.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import config from "../config.json";

function LoginWithGoogle({ setToken }) {
  const handleLogin = (googleData) => {
    console.log(googleData);
    axios
      .post("/login/google", { token: googleData.tokenId })
      .then((res) => {
        console.log(res.data);
        setToken(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };

  return (
    <div className="loginwithgoogle">
      <TwitterIcon className="icon" />
      <h1>Twitter</h1>
      <h3>
        welcome back Connect with friends and world arround you on Twitter
      </h3>
      <GoogleLogin
        clientId={config.googleCliantId}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default LoginWithGoogle;
