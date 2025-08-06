"use client";

import { registerUser } from "@/services/authService";
import { useUserStore } from "@/store/userStore";
import { Modal } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
 
};

export default function UpdateUserModal({ open, onClose }: Props) {
       const user = useUserStore((state) => state.user);
    
  const [form, setForm] = useState({
    fullName: user?.name,
    email: user?.email,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   setLoading(true);
    //   const res = await registerUser(form);

    //   if (res.statusCode === 200) {
    //     toast.success(res.message);
    //     setForm({ fullName: "", email: "" });
    //     onClose();
      
    //   } else {
    //     toast.error(res.message || "Something went wrong.");
    //   }
    // } catch (error: any) {
    //   toast.error(error?.response?.data?.message || "Update failed.");
    // } finally {
    //   setLoading(false);
    // }
  };

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
      <div className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-dark dark:text-white">
          Update User Info
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={form.email}
            onChange={handleChange}
          />

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
