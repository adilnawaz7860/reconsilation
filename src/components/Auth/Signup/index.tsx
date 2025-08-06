"use client";
import { EmailIcon } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import InputGroup from "../../FormElements/InputGroup";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import logo from "@/assets/logos/main.svg";
import { Code2 } from "lucide-react";

// Validation schema (updated)
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function SignUpWithPassword() {
  return (
    <div className="max-h-[500px] overflow-auto">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
         <div className="px-0 py-2.5 flex gap-2 items-center   text-3xl font-bold text-primary min-[850px]:py-0"
            >
             <Code2 className="text-xl"/> Wise-pay </div>
      </div>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log("Form values:", values);
          setTimeout(() => setSubmitting(false), 1000);
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            {/* Name */}
            <div className="mb-4">
              <InputGroup
                type="text"
                label="Name"
                placeholder="Enter your name"
                name="name"
                handleChange={handleChange}
                value={values.name}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <InputGroup
                type="email"
                label="Email"
                placeholder="Enter your email"
                name="email"
                handleChange={handleChange}
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <InputGroup
                type="text"
                label="Phone"
                placeholder="Enter your phone number"
                name="phone"
                handleChange={handleChange}
                value={values.phone}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <InputGroup
                type="password"
                label="Password"
                placeholder="Enter your password"
                name="password"
                handleChange={handleChange}
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <InputGroup
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                name="confirmPassword"
                handleChange={handleChange}
                value={values.confirmPassword}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
              >
                Sign Up
                {isSubmitting && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
