"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getallTransactions } from "@/services/transactionService";
import CreateTransactionModal from "./CreateTransactionModal";


export default function LatestTransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trxData ,setTrxData] = useState({});
  const [open ,setOpen] = useState(false);
  const rowsPerPage = 10;

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getallTransactions(1, rowsPerPage,"","");
      console.log(data?.data?.transactions , 'tadatada')
      setTransactions(data?.data?.transactions || []);
      
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransaction = (data: any) => {
    setTrxData(data);
    setOpen(true)
  }


const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Invalid Date";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};




  return (
    <div className="rounded-[10px] bg-white px-4 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
       <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
        Latest Transactions
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left"><div className="flex justify-start">TransactionId</div></TableHead>
            <TableHead className="flex items-center justify-start"><div>OrderId</div></TableHead>
            <TableHead className="text-right"><div className="flex justify-start">Amount</div></TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Email</TableHead>
             <TableHead className="text-center">UTR</TableHead>
              <TableHead className="text-center">Amount</TableHead>
               <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Updated At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>


          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: rowsPerPage }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : transactions.length > 0 ? (
            transactions.map((tx : any) => (
              <TableRow key={tx._id}>
                <TableCell className="text-left">{tx?.transactionid}</TableCell>
                <TableCell>{tx.orderid}</TableCell>
                   <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                       <TableCell>{tx.merchantid?.email}</TableCell>
                         <TableCell>{tx.utr}</TableCell>
                <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`text-sm font-medium capitalize ${
                      tx.status === "completed"
                        ? "text-green-600"
                        : tx.status === "PENDING"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.status}
                  </span>
                </TableCell>

                <TableCell className="text-center">{formatDate(tx.createdAt)}</TableCell>
                <TableCell className="text-center">{formatDate(tx.updatedAt)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                     <button
            onClick={() => handleTransaction(tx)}
            className="ml-4 rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
          >
            View
          </button>
                      {/* Add more actions like Edit/Delete here if needed */}
                    </div>
                  </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    <CreateTransactionModal transaction={trxData}  open={open} onClose={() => setOpen(false)} />
   
    </div>
  );
}

