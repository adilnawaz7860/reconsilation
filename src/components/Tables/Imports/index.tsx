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

import CreateUserModal from "./CreateImportModal";
import { getallUsers, updateUserStatus } from "@/services/authService";
import { Switch } from "@/components/FormElements/switch";
import { toast } from "sonner";
import UpdateUserModal from "./UpdateImportModal";
import CreateImportModal from "./CreateImportModal";
import { getallExcels } from "@/services/fileService";

// Dummy user data


export default function ImportTable() {
   const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
  const [excels ,setExcels] = useState([]);
  const [refresh ,setRefresh] = useState(false);
  const [editableData, setEditableData] = useState({});
   const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading ,setLoading] = useState(false);
    const rowsPerPage = 4;
  
  
  
      const formatDate = (dateStr : any) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));
  
   



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getallExcels(); 
        console.log(res, "res")// assumes it returns an array
        if (res.statusCode === 200) {
          setExcels(res?.data);
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

   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));



  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-4 justify-between w-full md:w-auto">
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
           
        
            <button
            onClick={() => setOpen(true)}
            className="ml-4 rounded bg-primary px-4 py-3 text-white hover:bg-opacity-90"
          >
            Import File
          </button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left"><div className="flex justify-start items-center">TransactionId</div></TableHead>
             <TableHead className="text-left"><div className="flex justify-start items-center">Amount</div></TableHead> 
              <TableHead className="text-left"><div className="flex justify-start items-center">merchantId</div></TableHead>
               <TableHead className="text-left"><div className="flex justify-start items-center">merchantMdr</div></TableHead>
                <TableHead className="text-left"><div className="flex justify-start items-center">Settle Amount</div></TableHead>
                 <TableHead className="text-left"><div className="flex justify-start items-center">Payer Mobile</div></TableHead>
                  <TableHead className="text-left"><div className="flex justify-start items-center">Payer Name</div></TableHead>
                   <TableHead className="text-left"><div className="flex justify-start items-center">Payer VPA</div></TableHead>
                     <TableHead className="text-left"><div className="flex justify-start items-center">UTR</div></TableHead>
                           
            <TableHead className="text-left"><div className="flex justify-start items-center">Customer Name</div></TableHead>
            <TableHead className="text-left"><div className="flex justify-start items-center">Customer VPA</div></TableHead>
                    <TableHead className="text-left"><div className="flex justify-start items-center">Status</div></TableHead>
                     <TableHead className="text-left"><div className="flex justify-start items-center">Transaction Time</div></TableHead>
                         <TableHead className="text-left"><div className="flex justify-start items-center">Created At</div></TableHead>
                  <TableHead className="text-left"><div className="flex justify-start items-center">Updated At</div></TableHead>
    
           
           
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
          ) : excels.length > 0 ? (
            excels.map((user : any) => (
              <TableRow key={user._id}>
                <TableCell className="text-left">{user.transactionid}</TableCell>
                <TableCell>{user.amount}</TableCell>
                <TableCell>{user.merchantId}</TableCell>
                  <TableCell>{user.merchantMdr}</TableCell>
                   <TableCell>{user.netSettlementAmt}</TableCell>
                    <TableCell>{user.payerMobile}</TableCell>
                    <TableCell>{user.payerName}</TableCell>
                    <TableCell>{user.payerVpa}</TableCell>
                     <TableCell>{user.utr}</TableCell>
                     <TableCell>{user.customerName}</TableCell>
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

                     <TableCell>{user.trxTime}</TableCell> 
                      <TableCell>{user.createdAt}</TableCell>
                       <TableCell>{user.updatedAt}</TableCell>




               
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
                No files found.
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
     <CreateImportModal setRefresh={setRefresh} open={open} onClose={() => setOpen(false)} />
           {/* <UpdateUserModal data={editableData} setRefresh={setRefresh} open={open2} onClose={() => setOpen2(false)} /> */}

    </div>
  );
}
