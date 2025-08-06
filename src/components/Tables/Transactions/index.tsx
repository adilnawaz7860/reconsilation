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

// Dummy transaction data
const dummyTransactions = [
  { id: 1, name: "Adil Nawaz", email: "adil@example.com", amount: 1200, status: "completed", date: "Aug 6, 2025" },
  { id: 2, name: "Sara Khan", email: "sara@example.com", amount: 850, status: "pending", date: "Aug 5, 2025" },
  { id: 3, name: "Ravi Sharma", email: "ravi@example.com", amount: 199.99, status: "failed", date: "Aug 4, 2025" },
  { id: 4, name: "Nikita Jain", email: "nikita@example.com", amount: 560, status: "completed", date: "Aug 3, 2025" },
  { id: 5, name: "Zain Ali", email: "zain@example.com", amount: 1100, status: "completed", date: "Aug 2, 2025" },
  { id: 6, name: "Priya Singh", email: "priya@example.com", amount: 750, status: "pending", date: "Aug 2, 2025" },
  { id: 7, name: "Amit Raj", email: "amit@example.com", amount: 999.99, status: "completed", date: "Aug 1, 2025" },
  { id: 8, name: "Neha Mehra", email: "neha@example.com", amount: 620, status: "failed", date: "Jul 30, 2025" },
  { id: 9, name: "Rohit Das", email: "rohit@example.com", amount: 890, status: "completed", date: "Jul 29, 2025" },
  { id: 10, name: "Simran Kaur", email: "simran@example.com", amount: 430, status: "pending", date: "Jul 28, 2025" },
];

export default function LatestTransactionsTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const filteredTransactions = dummyTransactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
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
            <TableHead className="text-left"><div className="flex justify-start">User</div></TableHead>
            <TableHead className="flex items-center justify-start"><div>Email</div></TableHead>
            <TableHead className="text-right"><div className="flex justify-start">Amount</div></TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Date</TableHead>
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
          ) : paginatedData.length > 0 ? (
            paginatedData.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="text-left">{tx.name}</TableCell>
                <TableCell>{tx.email}</TableCell>
                <TableCell>${tx.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`text-sm font-medium capitalize ${
                      tx.status === "completed"
                        ? "text-green-600"
                        : tx.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">{tx.date}</TableCell>
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
