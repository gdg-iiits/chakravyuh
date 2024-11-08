"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

// Mock data for demonstration
const mockUsers = [
  {
    fullName: "John Doe",
    email: "john@example.com",
    ug: "UG1",
    role: "user",
    joined: new Date("2023-01-15"),
    lastLogin: new Date("2023-06-01"),
    isActive: true,
    emailVerified: true,
    teamName: "Team A",
  },
  {
    fullName: "Jane Smith",
    email: "jane@example.com",
    ug: "UG2",
    role: "admin",
    joined: new Date("2023-02-20"),
    lastLogin: new Date("2023-05-30"),
    isActive: true,
    emailVerified: true,
    teamName: "Team B",
  },
  {
    fullName: "Alice Johnson",
    email: "alice@example.com",
    ug: "UG1",
    role: "user",
    joined: new Date("2023-03-10"),
    lastLogin: new Date("2023-05-28"),
    isActive: false,
    emailVerified: true,
    teamName: "Team A",
  },
  {
    fullName: "Bob Williams",
    email: "bob@example.com",
    ug: "UG3",
    role: "user",
    joined: new Date("2023-04-05"),
    lastLogin: new Date("2023-05-25"),
    isActive: true,
    emailVerified: false,
    teamName: "Team C",
  },
  {
    fullName: "Charlie Brown",
    email: "charlie@example.com",
    ug: "UG2",
    role: "superuser",
    joined: new Date("2023-05-01"),
    lastLogin: new Date("2023-06-02"),
    isActive: true,
    emailVerified: true,
    teamName: "Team B",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sortField, setSortField] = useState("joined");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [emailVerifiedFilter, setEmailVerifiedFilter] = useState(false);

  const filteredAndSortedUsers = mockUsers
    .filter(
      (user) =>
        (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedRole === "" || user.role === selectedRole) &&
        (!isActiveFilter || user.isActive) &&
        (!emailVerifiedFilter || user.emailVerified)
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by full name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="superuser">Superuser</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={isActiveFilter}
            onCheckedChange={setIsActiveFilter}
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Active Users
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="emailVerified"
            checked={emailVerifiedFilter}
            onCheckedChange={setEmailVerifiedFilter}
          />
          <label
            htmlFor="emailVerified"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email Verified
          </label>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>UG</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("joined")}>
                  Joined
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("lastLogin")}>
                  Last Login
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Is Active</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Team Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.ug}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{format(user.joined, "PP")}</TableCell>
                <TableCell>{format(user.lastLogin, "PP")}</TableCell>
                <TableCell>{user.isActive ? "Yes" : "No"}</TableCell>
                <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{user.teamName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
