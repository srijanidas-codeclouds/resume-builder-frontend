import * as yup from "yup";

export const usernameField = yup
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username is too long")
  .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
  .required("Username is required");

export const nameField = yup
  .string()
  .min(2, "Name is too short")
  .required("Full name is required");

export const emailField = yup
  .string()
  .email("Enter a valid email address")
  .required("Email is required");

export const passwordField = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required");

export const termsField = yup
  .boolean()
  .oneOf([true], "You must accept the terms");
