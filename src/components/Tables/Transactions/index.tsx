"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trxData, setTrxData] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const rowsPerPage = 10;

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getallTransactions(
        currentPage,
        rowsPerPage,
        statusFilter,
        search,
        startDate,
        endDate,
      );
      setTransactions(data?.data?.transactions || []);
      setTotalPages(data?.data?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState<any>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, search, statusFilter, startDate, endDate]);

  const handleTransaction = (data: any) => {
    setTrxData(data);
    setOpen(true);
  };

  const formatDate = (dateStr?: any) => {
    if (!dateStr) return "Invalid Date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFilter = () => {
    setSearch("");
    setStatusFilter("all");

    setRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    setStartDate("");
    setEndDate("");

    setCurrentPage(1);
  };
  const handleDateChange = (item: any) => {
    setRange([item.selection]);
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
  };


 const formatDateForAPI = (date :any) => {
  if (!date) return null;
  
  // Use local timezone instead of UTC to avoid date shifting
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

  return (
    <div className="w-full max-w-6xl rounded-[5px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
          {/* Search Input */}
          <input
            className="w-full rounded-md border border-gray-300 p-3 dark:bg-gray-800 dark:text-white md:w-96 lg:w-[400px]"
            placeholder="Search by Transaction ID, UTR, Payer Name, Customer Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status Filter */}
          <select
            className="w-full rounded-md border border-gray-300 p-3 text-sm dark:bg-gray-800 dark:text-white md:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
            <option value="PENDING">Pending</option>
          </select>

          {/* Start Date */}
          {/* <input
      type="date"
      className="w-full rounded-md border border-gray-300 p-3 text-sm dark:bg-gray-800 dark:text-white md:w-auto"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />

    {/* End Date */}
          {/* <input
      type="date"
      className="w-full rounded-md border border-gray-300 p-3 text-sm dark:bg-gray-800 dark:text-white md:w-auto"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    /> */}
          <div className="relative">
            <input
              readOnly
              value={
                range[0].startDate && range[0].endDate
                  ? `${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
                      range[0].endDate,
                      "dd/MM/yyyy",
                    )}`
                  : "Select date range"
              }
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full cursor-pointer rounded-md border border-gray-300 p-3 text-sm dark:bg-gray-800 dark:text-white md:w-auto"
            />

            {showDatePicker && (
              <div className="absolute z-50 mt-2 rounded-md border bg-white p-2 shadow-lg dark:bg-gray-800">
                <DateRange
                  ranges={range}
                  onChange={(item: any) => {
                    setRange([item.selection]);

                    const formattedStartDate :any = formatDateForAPI(item.selection.startDate);
    const formattedEndDate :any = formatDateForAPI(item.selection.endDate);
                    setStartDate(formattedStartDate);
                    setEndDate(formattedEndDate);

                    // Close only if both start and end dates are picked and they are not the same day
                    if (
                      item.selection.startDate &&
                      item.selection.endDate &&
                      item.selection.startDate.getTime() !==
                        item.selection.endDate.getTime()
                    ) {
                      setShowDatePicker(false);
                    }
                  }}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  direction="horizontal"
                  showDateDisplay={false}
                  rangeColors={["#4F46E5"]}
                />
              </div>
            )}
          </div>

          {/* Clear Filter Button */}
          <button
            onClick={handleFilter}
            className="w-full rounded-md border bg-primary px-3 py-3 text-sm text-white hover:bg-opacity-90 md:w-auto"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Table container for responsiveness */}
      <div className="overflow-x-auto">
        <Table className="min-h-[500px]">
          <TableHeader>
            <TableRow className="[&>th]:text-center">
              <TableHead className="whitespace-nowrap text-left">
                Transaction ID
              </TableHead>
              <TableHead className="whitespace-nowrap text-left">
                Order ID
              </TableHead>
              <TableHead className="whitespace-nowrap text-left">
                Amount
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Type
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Email
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                UTR
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Amount (₹)
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Status
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Created At
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Updated At
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: 11 }).map((__, cellIdx) => (
                    <TableCell key={cellIdx}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : transactions?.length > 0 ? (
              transactions.map((tx: any) => (
                <TableRow key={tx._id}>
                  <TableCell className="whitespace-nowrap">
                    {tx.transactionid}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {tx.orderid}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {tx.amount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{tx.type}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {tx.merchantid?.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{tx.utr}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    ₹{tx.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`text-sm font-medium capitalize ${
                        tx.status === "SUCCESS"
                          ? "text-green-600"
                          : tx.status === "PENDING"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(tx.createdAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(tx.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleTransaction(tx)}
                      className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="py-4 text-center text-gray-500"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="rounded border bg-primary px-3 py-1 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded border bg-primary px-3 py-1 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <CreateTransactionModal
        transaction={trxData}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
