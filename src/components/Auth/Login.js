import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import { API_URL } from "../../App";
import IntroNavBar from "./IntroNavBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [status, setStatus] = useState("primary");

  const navigate = useNavigate();

  let handleSubmit = async () => {
    // console.log(email, password);

    let res = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      window.sessionStorage.setItem("token", res.data.token);
      window.sessionStorage.setItem("role", res.data.role);
      window.sessionStorage.setItem("userId", res.data.userId);
      window.sessionStorage.setItem("userName", res.data.name);
      if (res.data.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setMessage(res.data.message);
      setStatus("error");
      setSubmitBtn("Retry");
    }
  };

  return (
    <>
      <IntroNavBar />
      <div className="mt-5 d-flex">
        <form className="shadow-form container d-grid gap-4 col-md-6 col-lg-3 pt-5 px-5 mt-5">
          <h2 className="text-center">Login</h2>
          <TextField
            type="text"
            name="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color={status}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            {submitBtn}
          </Button>

          <div className="d-flex justify-content-end">
            <button
              className="border-0 bg-white"
              style={{
                color: "#006fff",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signup")}
            >
              <u>Not Registered</u>??
            </button>
          </div>
          <span className="mt-0 mb-4">
            {message ? (
              <div className="text-danger text-center">{message}</div>
            ) : (
              <></>
            )}
          </span>
        </form>
      </div>
    </>
  );
}
