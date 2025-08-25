import { useActionState, useEffect } from "react";
import { signin } from "../actions/auth.actions";
import { Link, Navigate, useNavigate } from "react-router";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Eye } from "lucide-react";
import PasswordTextField from "../components/ui/password-textfield";
import Loader from "../components/loader";

function Signin() {
  const token = sessionStorage.getItem("auth_token");
  if (token) return <Navigate to={"/dashboard"} />;
  const [state, formAction, isPending] = useActionState(signin, undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.success) {
      sessionStorage.setItem("auth_token", state.data.token);
      navigate("/dashboard");
    }
  }, [state]);
  return (
    <div className="w-full h-screen flex justify-center items-center px-2 py-4">
      {isPending && <Loader />}
      <div className="border rounded-md shadow-sm px-2 lg:px-4 py-4 w-full md:w-3/4 lg:max-w-[40rem]">
        <h2 className="uppercase text-2xl lg:text-3xl font-bold mb-4 text-center">
          Welcome Back
        </h2>
        <p className="w-fit m-auto">Enter your credentials.</p>
        <form action={formAction} className="w-full !text-start">
          <div className="w-full grid gap-4 mt-6">
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              placeholder="Enter Email"
              error={state?.errors?.email ? true : false}
              autoFocus
              required
            />
            <PasswordTextField
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Enter Password"
              error={state?.errors?.password ? true : false}
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
              Sign in
            </Button>
            <div className="mt-2 flex justify-center items-center">
              Don&apos;t have an account,&nbsp;
              <Link to={"/signup"} className="text-blue-500">
                Signup here
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
