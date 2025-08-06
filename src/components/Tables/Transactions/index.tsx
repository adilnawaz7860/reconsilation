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
  const [open ,setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trxData , setTrxData] = useState({}) ;
  
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

  const handleTransaction = (data :any) => {
    setTrxData(data)
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

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="rounded-[10px] bg-white px-4 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-start mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            className="border border-gray-300 p-3 rounded-md dark:bg-gray-800 dark:text-white"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="border border-gray-300 p-3 rounded-md text-sm dark:bg-gray-800 dark:text-white"
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

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="[&>th]:text-center whitespace-nowrap">
              <TableHead className="text-left">Transaction ID</TableHead>
              <TableHead className="text-left">Order ID</TableHead>
              <TableHead className="text-left">Amount</TableHead>
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
                  <TableCell colSpan={11}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <TableRow key={tx._id}>
                  <TableCell className="text-left">{tx.transactionid}</TableCell>
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
                <TableCell colSpan={11} className="text-center py-4 text-muted">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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

      <CreateTransactionModal transaction={trxData}  open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
