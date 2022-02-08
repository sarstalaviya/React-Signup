import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const Fan = () => {
  const navigate = useNavigate();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState([]);
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [label, setLabel] = useState("Fan");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [checked, setChecked] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [validUserName, setValidUserName] = useState("");
  const emailPattern =
    /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const data = {
    first_name,
    last_name,
    username,
    email,
    password,
  };
  console.log(data);

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setValidPassword("");
    } else {
      setValidPassword("Is Not Strong Password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (first_name.toLocaleString().trim().length <= 0) {
      setFnameError("First Name is required");
    }
    if (last_name.toLocaleString().trim().length <= 0) {
      setlnameError("Last Name is required");
    }
    if (username.toLocaleString().trim().length <= 0) {
      setUsernameError("UserName is required");
    }
    if (email.toLocaleString().trim().length <= 0) {
      setEmailError("Email is required");
    }
    if (password.toLocaleString().trim().length <= 0) {
      setPasswordError("Password is required");
    }
    if (!emailPattern.test(email)) {
      setValidEmail("Email is not valid");
    }
    if (!check) {
      setChecked("Please select terms and conditions");
    } else {
      setUser([...user, data]);
      console.log(user);
      if (toggle) {
        axios
          .post("http://wren.in:3200/api/sign-up/talent", data)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .post("http://wren.in:3200/api/sign-up/fan", data)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
      alert("added");
      setfirst_name("");
      setlast_name("");
      setusername("");
      setEmail("");
      setPassword("");
    }
  };

  const ChangeToggle = () => {
    setToggle(!toggle);
    if (!toggle) {
      console.log("Fan", toggle);
      setLabel("Talent");
    } else {
      console.log("Talent", toggle);
      setLabel("Fan ");
    }
  };

  return (
    <>
      <div className="background-color">
        <div className="App">
          <label className="toggle-label">
            <input type="checkbox" onChange={ChangeToggle} />
            <span className="base-color">
              <span className="toggle-slider"></span>
              <span className="cash">FAN SIGNUP</span>
              <span className="token">TALENT SIGNUP</span>
            </span>
          </label>

          <div className="text-center">
            <h2>Create Your {label} Account</h2>
          </div>

          <div className="form-main-warp">
            <form onSubmit={handleSubmit}>
              <label>First name* </label>
              <input
                type="text"
                placeholder="First name"
                value={first_name}
                name="first_name"
                onChange={(e) => {
                  setfirst_name(e.target.value);
                  setFnameError("");
                }}
              ></input>{" "}
              <span className="error-label">{fnameError}</span>
              <br />
              <label>Last name* </label>
              <input
                type="text"
                placeholder="Last name"
                value={last_name}
                name="last_name"
                onChange={(e) => {
                  setlast_name(e.target.value);
                  setlnameError("");
                }}
              ></input>
              <span className="error-label">{lnameError}</span>
              <br />
              <label>username * </label>
              <input
                type="text"
                placeholder="username"
                value={username}
                name="username"
                onChange={(e) => {
                  setusername(e.target.value);
                  setUsernameError("");
                }}
              ></input>
              <span className="error-label">{usernameError}</span>
              <br />
              <label>Email* </label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setValidEmail("");
                }}
              ></input>
              <span className="error-label">{emailError}</span>
              <span className="error-label">{validEmail}</span>
              <br />
              <label>Password* </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validate(e.target.value);
                  setPasswordError("");
                }}
              ></input>
              <span className="error-label">{passwordError}</span>
              <span className="error-label">{validPassword}</span>
              <br />
              <div className="check">
              <input
                type="checkbox"
                className="checkBox"
                onClick={() => {
                  setCheck(!check);
                  setChecked("");
                }}
              ></input>
              <label className="check-warp">
                I agree to the <span>Terms and Conditions.</span>
              </label>
              </div>
              <span className="error-label">{checked}</span>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fan;
