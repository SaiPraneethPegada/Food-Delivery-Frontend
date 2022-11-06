import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { API_URL } from "../../App";
import IntroNavBar from "./IntroNavBar";

export default function Signup() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [status, setStatus] = useState("primary");

  let navigate = useNavigate();

  const handleSubmit = async () => {
    // console.log(role, firstName, lastName, email, password);
    let res = await axios.post(`${API_URL}/users/signup`, {
      role,
      firstName,
      lastName,
      email,
      password,
    });
    // console.log(res);
    if (res.data.statusCode === 200) {
      alert(res.data.message);
      navigate("/login");
    } else {
      setMessage(res.data.message);
      setStatus("error");
      setSubmitBtn("Retry");
    }
  };

  return (
    <>
      <IntroNavBar />
      <form className="shadow-form container d-grid col-md-6 col-lg-4 p-5 gap-4 mt-5">
        <h2 className="text-center"> SignUp</h2>
        <FormControl fullWidth required>
          <InputLabel>Signup as</InputLabel>
          <Select
            name="role"
            value={role}
            label="isAdmin"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          name="firstName"
          label="firstName"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          type="text"
          name="lastName"
          label="Last Name"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type="email"
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
            onClick={() => navigate("/login")}
          >
            <u>Already Registered</u>??
          </button>
        </div>
        {message ? (
          <div className="text-center text-danger">{message}</div>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
