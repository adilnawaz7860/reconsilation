"use client"
import { getAllUsersCount, getAllTransactionsCount} from "@/services/analyticsService";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { OverviewCardsSkeleton } from "../overview-cards/skeleton";
import StatusDonutChart from './status-donut'


export function OverviewCardsGroup() {
  const [users, setUsers] = useState("");
  const [amount, setAmount] = useState("0");
  const [totalPayin, setTotalPayin] = useState("0");
  const [totalPayout, setTotalPayout] = useState("0");
  const [progressPercent,setProgressPercent] = useState("0");

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
          setProgressPercent(res?.data)

  };

  //   const getData = async () => {
  //   const res = await getAllExcelsCount();
  //   setExcels(res?.data?.totalExcelData ?? "0");
  // };

useEffect(() => {
  (async () => {
    setLoading(true);
    try {
      await Promise.all([getRole(), getUser(), getTransaction()]);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // always runs
    }
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
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:gap-7.5">
  {/* Cards container */}
  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {role === "ADMIN" && (
      <OverviewCard label="Total Users" data={users} Icon={icons.Users} />
    )}
    <OverviewCard label="Total Amount" data={amount} Icon={icons.Product} />

    <OverviewCard label="Total Payin" data={totalPayin} Icon={icons.Product} />
    <OverviewCard label="Total Payout" data={totalPayout} Icon={icons.Product} />
  </div>

  {/* Progress bar */}
  <div className="row-span-2 flex flex-col gap-4 mb-6 justify-center bg-white p-6 shadow-1 dark:bg-gray-dark rounded-lg">
    <p className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">Transaction Status</p>
    <StatusDonutChart progress={progressPercent}/>
   
  </div>
</div>



  );
}
