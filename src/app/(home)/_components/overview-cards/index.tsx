"use client"
import { getAllUsersCount, getAllTransactionsCount} from "@/services/analyticsService";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { OverviewCardsSkeleton } from "../overview-cards/skeleton";

export function OverviewCardsGroup() {
  const [users, setUsers] = useState("");
  const [transactions, setTransactions] = useState("");
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
    setTransactions(res?.data?.totalTransactions ?? "0");
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
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {role === "ADMIN" && (
        <OverviewCard label="Total Users" data={users} Icon={icons.Users} />
      )}
      <OverviewCard label="Total Transactions" data={transactions} Icon={icons.Product} />
       {/* <OverviewCard label="Total Excel Datas" data={excels} Icon={icons.Product} /> */}
    </div>
  );
}
