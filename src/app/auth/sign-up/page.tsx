import Signup from "@/components/Auth/Signup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card w-full max-w-xl">
        <div className="w-full p-4 sm:p-12.5 xl:p-15">
          <Signup />
        </div>
      </div>
    </div>
  );
}
