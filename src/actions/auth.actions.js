import axios from "axios";
import handleErrors from "./common.action";
import { z } from "zod";
import * as authService from "../service/auth.service";

// SignIn
const signinSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function signin(prevState, formData) {
  const form = signinSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!form.success) {
    return {
      success: false,
      errors: z.flattenError(form.error).fieldErrors,
    };
  }

  const body = {
    email: form.data.email.toLowerCase().trim(),
    password: form.data.password,
  };

  const res = await authService.signin(body);
  return res;
}

// Signup
const signupSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
  confirmPassword: z.any().refine((val) => (val === false ? false : true), {
    error: "Password and Confirm password must be same",
  }),
});

export async function signup(prevState, formData) {
  const form = signupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword:
      formData.get("confirm-password") === formData.get("password")
        ? formData.get("confirm-password")
        : false,
  });

  if (!form.success) {
    return {
      success: false,
      errors: z.flattenError(form.error).fieldErrors,
    };
  }

  const body = {
    username: form.data.username,
    email: form.data.email.toLowerCase().trim(),
    password: form.data.password,
    confirmPassword: form.data.confirmPassword,
  };

  const res = await authService.signup(body);
  return res;
}
