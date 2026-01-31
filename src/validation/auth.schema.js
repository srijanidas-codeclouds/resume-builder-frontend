import * as yup from "yup";
import {
  usernameField,
  nameField,
  emailField,
  passwordField,
  termsField,
} from "./field.js";

/* ---------- Sign In ---------- */
const signInSchema = yup.object({
  email: emailField,
  password: passwordField,
});

/* ---------- Sign Up ---------- */
const signUpSchema = yup.object({
  username: usernameField,
  name: nameField,
  email: emailField,
  password: passwordField,
  terms: termsField,
});

/* ---------- Reset Password ---------- */
const resetPasswordSchema = yup.object({
  email: emailField,
});

/* ---------- Change Password ---------- */
const changePasswordSchema = yup.object({
  password: passwordField,
  newPassword: passwordField,
  confirmPassword: passwordField,
});

export {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  changePasswordSchema,
};