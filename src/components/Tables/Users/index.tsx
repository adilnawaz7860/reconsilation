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
import { getallUsers, updateUserStatus } from "@/services/authService";
import { Switch } from "@/components/FormElements/switch";
import { toast } from "sonner";
import UpdateUserModal from "./UpdateUserModal";

// Dummy user data


export default function UserTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
  const [users ,setUsers] = useState([]);
  const [refresh ,setRefresh] = useState(false);
  const [editableData, setEditableData] = useState({});

  const rowsPerPage = 10;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getallUsers(); 
        console.log(res, "res")// assumes it returns an array
        if (res.statusCode === 200) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  const handleEdit = (data : any) => {
     setEditableData(data)
     setOpen2(true);
    
  }

  const filteredUsers = users.filter((user : any) => {
    const matchesSearch =
      user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      user?.phone?.includes(search);

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-4 justify-between w-full md:w-auto">
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
           
        
            <button
            onClick={() => setOpen(true)}
            className="ml-4 rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
          >
            Create User
          </button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left"><div className="flex justify-start items-center">Name</div></TableHead>
            <TableHead className="text-left"><div className="flex justify-start items-center">Email</div></TableHead>
            <TableHead className="text-left"><div className="flex justify-start items-center">Phone</div></TableHead>
            <TableHead className="text-left"><div className="flex justify-start items-center">Status</div></TableHead>
            <TableHead className="text-left"><div className="flex justify-start items-center">Action</div></TableHead>
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
          ) : paginatedData.length > 0 ? (
            paginatedData.map((user : any) => (
              <TableRow key={user._id}>
                <TableCell className="text-left">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                 
               <Switch
  withIcon
  checked={user.status === "ACTIVE"}
  onChange={async (checked) => {
    const newStatus = checked ? "ACTIVE" : "INACTIVE";

    try {
      await updateUserStatus(user._id); 
      setRefresh((prev : any) => !prev)
      // Call your API
      toast.success(`User ${user.fullName} is now ${newStatus}`);
      // Optionally update local user list if not using refetch
    } catch (err) {
      toast.error("Failed to update user status");
    }
  }}
/>
<span className="ml-2">{user.status}</span>
                  
                </TableCell>
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
              <TableCell colSpan={5} className="text-center py-4 text-muted">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
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

      {/* Modal: Create User */}
     <CreateUserModal setRefresh={setRefresh} open={open} onClose={() => setOpen(false)} />
           <UpdateUserModal data={editableData} setRefresh={setRefresh} open={open2} onClose={() => setOpen2(false)} />

    </div>
  );
}
