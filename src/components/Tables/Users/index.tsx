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

// Dummy user data
const dummyUsers = [
  { id: 1, name: "Adil Nawaz", email: "adil@example.com", phone: "9876543210", status: "active" },
  { id: 2, name: "Sara Khan", email: "sara@example.com", phone: "9123456789", status: "inactive" },
  { id: 3, name: "Ravi Sharma", email: "ravi@example.com", phone: "9988776655", status: "active" },
  { id: 4, name: "Nikita Jain", email: "nikita@example.com", phone: "9112233445", status: "inactive" },
  { id: 5, name: "Zain Ali", email: "zain@example.com", phone: "9001122334", status: "active" },
];

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Simulate loading
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-md dark:bg-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold text-dark dark:text-white">
          User List
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            placeholder="Search by name, email or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded-md text-sm dark:bg-gray-800 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead className="text-left">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
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
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-left">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm font-medium ${
                      user.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button>
                    View
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
    </div>
  );
}
