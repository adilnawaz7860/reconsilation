"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLatestTransactions } from "../fetch";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {getallTransactions} from '@/services/transactionService'

export function LatestTransactions({ className }: { className?: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactions ,setTransactions] = useState([]);


   useEffect(() => {
      const fetchAllTransactions = async () => {
        try {
          const res = await getallTransactions(); 
          console.log(res, "res")// assumes it returns an array
          if (res.statusCode === 200) {
            setTransactions(res.data);
          }
        } catch (error) {
          console.error("Failed to fetch users:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllTransactions();
    }, []);



  return (
    <div
      className={cn(
        "rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-dark",
        className
      )}
    >
      <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
        Latest Transactions
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left"><div className="flex justify-start">User</div></TableHead>
            <TableHead className="flex items-center justify-start"><div>Email</div></TableHead>
            <TableHead className="text-right"><div className="flex justify-start">Amount</div></TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : transactions.slice(0 , 10)?.map((tx, i) => (
                <TableRow key={i}>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={tx.avatar || `https://i.pravatar.cc/150?img=${i + 1}`}
                        alt={tx.name}
                        width={36}
                        height={36}
                        className="rounded-full"
                      /> */}
                      <span className="font-medium">{tx.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-left">{tx.email}</TableCell>

                  <TableCell className="text-left  text-green-600">
                    ${tx.amount.toFixed(2)}
                  </TableCell>

                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "capitalize text-sm font-semibold",
                        tx.status === "completed"
                          ? "text-green-600"
                          : tx.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      )}
                    >
                      {tx.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">{tx.date}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
