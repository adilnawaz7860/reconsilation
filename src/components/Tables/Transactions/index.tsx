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

export default function LatestTransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const rowsPerPage = 4;

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getallTransactions(currentPage, rowsPerPage, search, statusFilter);
      setTransactions(data?.data?.transactions || []);
      setTotalPages(data?.data?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, search, statusFilter]);

   const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Invalid Date";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};


  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  return (
    <div className="rounded-[10px] bg-white px-4 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            className="border border-gray-3 p-3"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="border border-gray-3 p-3 rounded-md text-sm dark:bg-gray-800 dark:text-white"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
             <TableHead className="text-left"><div className="flex justify-start">TransactionId</div></TableHead>
            <TableHead className="flex items-center justify-start"><div>OrderID</div></TableHead>
            <TableHead className="text-right"><div className="flex justify-start">Amount</div></TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Email</TableHead>
             <TableHead className="text-center">UTR</TableHead>
              <TableHead className="text-center">Amount</TableHead>
               <TableHead className="text-center">Status</TableHead>
                {/* <TableHead className="text-center">Webhook Time</TableHead> */}
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Updated At</TableHead>
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
                <TableCell>${tx.amount.toFixed(2)}</TableCell>
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
                  {/* <TableCell className="text-center">{formatDate(tx.webhookTime)}</TableCell> */}

                <TableCell className="text-center">{formatDate(tx.createdAt)}</TableCell>
                <TableCell className="text-center">{formatDate(tx.updatedAt)}</TableCell>
               
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

     {!loading && totalPages > 1 && (
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 bg-primary text-white py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-primary text-white border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
