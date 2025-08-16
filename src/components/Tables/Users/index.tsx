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

import CreateUserModal from "./CreateUserModal";
import {
  getallUsers,
  getCurrentUser,
  updateUserStatus,
} from "@/services/authService";
import { Switch } from "@/components/FormElements/switch";
import { toast } from "sonner";
import UpdateUserModal from "./UpdateUserModal";

// Dummy user data

export default function UserTable() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
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

  const formatDate = (dateStr: any) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getallUsers(
          currentPage,
          rowsPerPage,
          search,
          statusFilter,
        );
        console.log(res, "res"); // assumes it returns an array
        if (res.statusCode === 200) {
          setUsers(res?.data?.users ?? []);
          setTotalPages(res?.data?.totalPages || 1);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh , currentPage  , search , statusFilter]);

  const handleEdit = (data: any) => {
    setEditableData(data);
    setOpen2(true);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex flex-col w-full gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start md:items-center flex-col md:flex-row gap-4 justify-between w-full md:w-auto">
         <input
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
          </select>
       
        </div>

        <div className="flex-col gap-4 sm:flex-row sm:items-center">
          {role === "ADMIN" && (
            <button
              onClick={() => setOpen(true)}
              className="rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
            >
              Create User
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Name</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Email</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Phone</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Status</div>
            </TableHead>
            <TableHead className="text-left">
              <div className="flex items-center justify-start">Created At</div>
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
          ) : users.length > 0 ? (
            users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="text-left">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell style={{padding : "0.5rem"}} className="p-2">
                  <Switch
                    withIcon
                    checked={user.status === "ACTIVE"}
                    onChange={async (checked) => {
                      const newStatus = checked ? "ACTIVE" : "INACTIVE";

                      try {
                        await updateUserStatus(user._id);
                        setRefresh((prev: any) => !prev);
                        // Call your API
                        toast.success(
                          `User ${user.fullName} is now ${newStatus}`,
                        );
                        // Optionally update local user list if not using refetch
                      } catch (err) {
                        toast.error("Failed to update user status");
                      }
                    }}
                  />
                 
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleEdit(user)}
                    className="ml-4 rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
                  >
                    Update User
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-muted py-4 text-center">
                No users found.
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
      <CreateUserModal
        setRefresh={setRefresh}
        open={open}
        onClose={() => setOpen(false)}
      />
      <UpdateUserModal
        data={editableData}
        setRefresh={setRefresh}
        open={open2}
        onClose={() => setOpen2(false)}
      />
    </div>
  );
}
