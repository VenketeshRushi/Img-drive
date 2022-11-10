import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styles from "../Styles/login.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const [signupdata, setsignupdata] = useState({});
  const navigate = useNavigate();
  async function signUpApi(data) {
    try {
    
      let response = await axios.post(
        "https://imguploads.herokuapp.com/users/signup",
        signupdata
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setsignupdata({
      ...signupdata,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpApi(signupdata);
    console.log(signupdata);
  };

  return (
    <>
      <div className={styles.hero}>
        <Box className={styles.welcome}>
          <Box className={styles.info}>
            <p>Welcome to Rsquare.</p>
            <p>
              Lets get you all set up so start with your account and begin
              setting up your profile.
            </p>
          </Box>
        </Box>
        <Box className={styles.signupinfo}>
          <Box className={styles.signupheading}>
            <h1>Begin your journey!</h1>
            <p>Get started with the best platform for design </p>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              fontFamily={"Manrope"}
              fontSize={"12px"}
              fontWeight={"600"}
              display="flex"
              width={"100%"}
              gap="16px"
            >
              <Box width={"48.5%"}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                  color="#6360AB"
                >
                  <label>First Name*</label>
                  <TextField
                    name="firstName"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                >
                  <label>Email Address*</label>
                  <TextField
                    name="email"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <label>Password*</label>
                  <TextField
                    name="password"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
              </Box>
              <Box width={"48.5%"}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                >
                  <label>Last Name*</label>
                  <TextField
                    name="lastName"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                >
                  <label>Phone Number*</label>
                  <TextField
                    name="phone"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
              </Box>
            </Box>
            <Box className={styles.signupcheckbox}>
              <input type="checkbox" />
              <p>
                By signing up, you agree to our User Agreement, Terms of
                Service, & Privacy Policy
              </p>
            </Box>
            <Box>
              <button type="submit" className={styles.btn}>
                Sign Up
              </button>
            </Box>
            <Box className={styles.last}>
              Already have an account?{" "}
              <Link to="/login" color="#6360ab">
                {" "}
                Log In
              </Link>
            </Box>
          </form>
        </Box>
      </div>
    </>
  );
}

export default Signup;
