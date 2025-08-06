"use client";

import { registerUser } from "@/services/authService";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = {
  open: boolean;
  onClose: () => void;
  setRefresh : any
};

export default function CreateUserModal({ open, onClose ,setRefresh}: Props) {
    const [loading , setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
   onSubmit: async (values, { resetForm }) => {
  try {
    setLoading(true);
    const res = await registerUser(values);

    if (res.statusCode === 200) {
      toast.success(res.message);
      resetForm();       // ✅ clear form
      onClose();
      setRefresh((prev : any) => !prev)         // ✅ close modal
    } else {
      onClose();
      toast.error(res.message || "Something went wrong.");
    }
  } catch (error : any) {
      onClose();
    toast.error(error?.response?.data?.message || "Registration failed.");
  }finally{
    setLoading(false);
  }
}

  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div className=" z-[9999] absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-dark dark:text-white">
          Create User
        </h2>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
             <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 flex items-center justify-center min-w-[80px]"
            >
              {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
