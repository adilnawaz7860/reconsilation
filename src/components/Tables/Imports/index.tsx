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

  const getUser = async () => {
    const res = await getCurrentUser();
    setRole(res?.data?.role);
  };

  useEffect(() => {
    getUser();
  }, []);

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
        const res = await getallExcels(currentPage, rowsPerPage);
        console.log(res, "res"); // assumes it returns an array
        if (res.statusCode === 200) {
          setExcels(res?.data?.excels);
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
  }, [refresh, currentPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-6xl w-full overflow-x-auto rounded-[5px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          {/* <input
            className="border rounded-md border-gray-3 p-3"
            placeholder="Search by name, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-3 p-3 rounded-md text-sm dark:bg-gray-800 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select> */}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {role !== "ADMIN" && (
            <button
              onClick={() => setOpen(true)}
              className="ml-4 rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
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
                <TableCell>{user.merchantId}</TableCell>
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
              <TableCell colSpan={5} className="text-muted py-4 text-center">
                No files found.
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
