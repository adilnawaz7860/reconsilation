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
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CreateImportModal from "./CreateImportModal";
import { getallExcels } from "@/services/fileService";
import { getCurrentUser } from "@/services/authService";
// Dummy user data

export default function ImportTable() {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [excels, setExcels] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log(startDate, endDate);

  const getUser = async () => {
    const res = await getCurrentUser();
    setRole(res?.data?.role);
  };

  useEffect(() => {
    getUser();
  }, []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const formatDate = (dateStr?: any) => {
    if (!dateStr) return "Invalid Date";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getallExcels(
          currentPage,
          rowsPerPage,
          statusFilter,
          search,
          startDate,
          endDate,
        );
        console.log(res, "res"); // assumes it returns an array
        if (res.statusCode === 200) {
          setExcels(res?.data?.excels ?? res?.data);
          const total = res.data.length;
          console.log(total, "totally"); // assuming data includes ALL records
          const totalPages = Math.ceil(res?.data?.totalCount / rowsPerPage);
          setTotalPages(res?.data?.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh, currentPage, search, statusFilter, startDate, endDate]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFilter = () => {
    setSearch("");
    setStatusFilter("all");
    setRange([{ startDate: null, endDate: null, key: "selection" }]);
    setCurrentPage(1);
  };
  const handleDateChange = (item) => {
    setRange([item.selection]);
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
  };
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl overflow-x-auto rounded-[5px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Filters Section */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-3">
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

          {/* Start Date
          <input
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
          />  */}

          {/* <div>
            <DateRangePicker
              onChange={(item) => setRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={range}
              direction="horizontal"
            />
            <div className="mt-2">
              <p>From: {range[0].startDate.toDateString()}</p>
              <p>To: {range[0].endDate.toDateString()}</p>
            </div>
          </div> */}
          {/* <DateRangePicker
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={range}
            direction="horizontal"
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
              <div className="absolute z-50 mt-2 shadow-lg">
                <DateRangePicker
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={range}
                  direction="horizontal"
                />
              </div>
            )}
          </div>

          {/* Clear Filter Button */}
          <button
            onClick={handleFilter}
            className="w-full whitespace-nowrap rounded-md border bg-primary px-3 py-3 text-sm text-white hover:bg-opacity-90 md:w-auto"
          >
            Clear Filter
          </button>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {role !== "ADMIN" && (
            <button
              onClick={() => setOpen(true)}
              className="w-full whitespace-nowrap rounded bg-primary px-4 py-3 text-sm text-white hover:bg-opacity-90 sm:w-auto"
            >
              Import File
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader className="whitespace-nowrap">
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left">
              <div className="flex items-center justify-start">
                TransactionId
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Amount</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">merchantId</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">merchantMdr</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start whitespace-nowrap">
                Settle Amount
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">
                Payer Mobile
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Payer Name</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Payer VPA</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">UTR</div>
            </TableHead>

            <TableHead className="text-left">
              <div className="flex items-center justify-start whitespace-nowrap">
                Customer Name
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">
                Customer VPA
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Status</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">
                Transaction Time
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Created At</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Updated At</div>
            </TableHead>

            <TableHead className="text-left">
              <div className="flex items-center justify-start">Action</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8" />
                </TableCell>
              </TableRow>
            ))
          ) : excels.length > 0 ? (
            excels.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="text-left">
                  {user.transactionid}
                </TableCell>
                <TableCell>{user.amount}</TableCell>
                <TableCell>
                  {typeof user.merchantId === "object"
                    ? user.merchantId?.email
                    : user.merchantId}
                </TableCell>
                <TableCell>{user.merchantMdr}</TableCell>
                <TableCell>{user.netSettlementAmt}</TableCell>
                <TableCell>{user.payerMobile}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {user.payerName}
                </TableCell>
                <TableCell>{user.payerVpa}</TableCell>
                <TableCell>{user.utr}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {user.customerName}
                </TableCell>
                <TableCell>{user.customerVpa}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        user.status === "SUCCESS"
                          ? "green"
                          : user.status === "FAILED"
                            ? "red"
                            : "goldenrod",
                      fontWeight: "500",
                    }}
                  >
                    {user.status}
                  </span>
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {formatDate(user.trxTime)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(user.updatedAt)}
                </TableCell>

                <TableCell>
                  {/* <button
                    onClick={() => handleEdit(user)}
                    className="ml-4 rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
                  >
                    Update User
                  </button> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-muted py-4 text-center">
                No Data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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

      {/* Modal: Create User */}
      <CreateImportModal
        setRefresh={setRefresh}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
