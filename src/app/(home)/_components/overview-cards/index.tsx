"use client"
import { getAllUsersCount, getAllTransactionsCount} from "@/services/analyticsService";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { OverviewCardsSkeleton } from "../overview-cards/skeleton";

export function OverviewCardsGroup() {
  const [users, setUsers] = useState("");
  const [amount, setAmount] = useState("");
  const [totalPayin, setTotalPayin] = useState("");
  const [totalPayout, setTotalPayout] = useState("");
  const [progressPercent,setProgressPercent] = useState("");

  const [excels, setExcels] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const getRole = async () => {
    const res = await getCurrentUser();
    setRole(res?.data?.role || "");
  };

  const getUser = async () => {
    const res = await getAllUsersCount();
    setUsers(res?.data?.totalUsers ?? "0");
  };

  const getTransaction = async () => {
    const res = await getAllTransactionsCount();
    console.log(res , "response")
    setAmount(res?.data?.totalAmount ?? "0");
     setTotalPayin(res?.data?.totalPayin ?? "0");
          setTotalPayout(res?.data?.totalPayout ?? "0");

  };

  //   const getData = async () => {
  //   const res = await getAllExcelsCount();
  //   setExcels(res?.data?.totalExcelData ?? "0");
  // };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([getRole(), getUser(), getTransaction()]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <OverviewCardsSkeleton />
       
      </div>
    );
  }

  return (
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 2xl:gap-7.5">
  {/* Cards container */}
  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
    {role === "ADMIN" && (
      <OverviewCard label="Total Users" data={users} Icon={icons.Users} />
    )}
    <OverviewCard label="Total Amount" data={amount} Icon={icons.Product} />

    <OverviewCard label="Total Payin" data={totalPayin} Icon={icons.Product} />
    <OverviewCard label="Total Payout" data={totalPayout} Icon={icons.Product} />
  </div>

  {/* Progress bar */}
  {/* <div className="row-span-2 flex flex-col justify-center bg-white p-6 shadow-1 dark:bg-gray-dark rounded-lg p-6">
    <p className="text-white mb-4">Transaction Completion</p>
    <div className="flex-1 flex flex-col justify-center">
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{progressPercent}% Completed</p>
    </div>
  </div> */}
</div>



  );
}
