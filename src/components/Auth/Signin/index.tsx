"use client";
import Link from "next/link";
import React from "react";
import InputGroup from "../../FormElements/InputGroup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";
import {toast} from 'sonner';
import {loginUser} from '@/services/authService'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

// Validation schema
const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  remember: Yup.boolean(),
});

export default function SigninWithPassword() {
  const router = useRouter();
  return (
    <div>
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
          <div className="relative  h-12 w-[200px]">
                   <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="wisepay logo"
        role="presentation"
        quality={100}
      />
              </div>

      </div>

      <Formik
        initialValues={{
          email: "",
          password:  "",
          remember: false,
        }}
        validationSchema={SigninSchema}
      onSubmit={async (values, { setSubmitting }) => {
  setSubmitting(true);
  try {
     const res = await loginUser(values)
      const { accessToken, refreshToken,name, user,email, role } = res.data;
     
        useUserStore.getState().setUser({ name : user.fullName, email : user.email, role });
     

    // Save token to sessionStorage
    sessionStorage.setItem("token", accessToken);

    toast.success("Signed in successfully!");
    router.push('/dashboard')

    // You can redirect here if needed
    // router.push("/dashboard");

  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  } finally {
    setSubmitting(false);
  }
}}

      >
        {({ isSubmitting, values, handleChange, setFieldValue }) => (
          <Form>
            {/* Email */}
            <div className="mb-4">
              <InputGroup
                type="email"
                label="Email"
                placeholder="Enter your email"
                name="email"
                handleChange={handleChange}
                value={values.email}
                // icon={<EmailIcon />}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <InputGroup
                type="password"
                label="Password"
                placeholder="Enter your password"
                name="password"
                handleChange={handleChange}
                value={values.password}
                // icon={<PasswordIcon />}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Remember Me + Forgot */}
            {/* <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
             

              <Link
                href="/auth/forgot-password"
                className="hover:text-primary dark:text-white dark:hover:text-primary"
              >
                Forgot Password?
              </Link>
            </div> */}

            {/* Submit Button */}
            <div className="mb-4.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
              >
                Sign In
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
          Don’t have any account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
