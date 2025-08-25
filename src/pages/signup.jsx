import React, { useActionState, useEffect } from "react";
import { signup } from "../actions/auth.actions";
import { Link, Navigate, useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";
import PasswordTextField from "../components/ui/password-textfield";
import Loader from "../components/loader";

function Signup() {
  const token = sessionStorage.getItem("auth_token");
  if (token) return <Navigate to={"/dashboard"} />;
  const [state, formAction, isPending] = useActionState(signup, undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.success) navigate("/signin");
  });
  return (
    <div className="w-full h-screen flex justify-center items-center px-2 py-4">
      {isPending && <Loader />}
      <div className="border rounded-md shadow-sm px-2 lg:px-4 py-4 w-full md:w-3/4 lg:max-w-[40rem]">
        <h2 className="uppercase text-2xl lg:text-3xl font-bold mb-4 text-center">
          Sign up
        </h2>
        <p className="w-fit m-auto">Enter your details here.</p>
        <form action={formAction} className="w-full !text-start mt-4">
          <div className="w-full grid gap-4">
            <TextField
              name="username"
              variant="outlined"
              label="Username"
              placeholder="Enter Username"
              error={state?.errors?.username ? true : false}
              autoFocus
              required
            />
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              required
              placeholder="Enter Email"
              error={state?.errors?.email ? true : false}
            />
            <PasswordTextField
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Enter Password"
              error={state?.errors?.password ? true : false}
              required
            />
            <PasswordTextField
              name="confirm-password"
              label="Confirm Password"
              variant="outlined"
              placeholder="Enter Confirm Password"
              error={state?.errors?.confirmPassword ? true : false}
              helperText={
                state?.errors?.confirmPassword
                  ? "Confirm password mismatch"
                  : undefined
              }
              required
            />
            {state && !state.success && state.message && (
              <p className="text-red-500 text-sm !text-start mt-2">
                {state.message}
              </p>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="!py-2"
            >
              Sign up
            </Button>
            <div className="mt-2 flex justify-center items-center">
              Already have an account,&nbsp;
              <Link to={"/signin"} className="text-blue-500">
                Signin
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
