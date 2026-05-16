"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  TrendingUp,
  Edit3,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  GraduationCap,
  DollarSign,
  Activity,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────

type EmployeeStatus = "active" | "on-leave" | "terminated" | "probation";
type Department = "Engineering" | "Sales" | "Marketing" | "HR" | "Finance" | "Operations" | "Design";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: Department;
  status: EmployeeStatus;
  joinDate: string;
  salary: number;
  location: string;
  avatar: string;
  performance: number;
}

interface ActivityItem {
  id: string;
  type: "hire" | "leave" | "review" | "promotion" | "termination";
  employeeName: string;
  description: string;
  timestamp: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────

const DEPARTMENTS: Department[] = [
  "Engineering",
  "Sales",
  "Marketing",
  "HR",
  "Finance",
  "Operations",
  "Design",
];

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-03-15",
    salary: 125000,
    location: "New York, NY",
    avatar: "SJ",
    performance: 92,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@company.com",
    phone: "+1 (555) 234-5678",
    role: "Product Manager",
    department: "Engineering",
    status: "active",
    joinDate: "2022-08-01",
    salary: 140000,
    location: "San Francisco, CA",
    avatar: "MC",
    performance: 88,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    phone: "+1 (555) 345-6789",
    role: "Sales Director",
    department: "Sales",
    status: "active",
    joinDate: "2021-11-20",
    salary: 160000,
    location: "Austin, TX",
    avatar: "ER",
    performance: 95,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.k@company.com",
    phone: "+1 (555) 456-7890",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "on-leave",
    joinDate: "2023-01-10",
    salary: 85000,
    location: "Chicago, IL",
    avatar: "DK",
    performance: 78,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@company.com",
    phone: "+1 (555) 567-8901",
    role: "HR Manager",
    department: "HR",
    status: "active",
    joinDate: "2020-05-15",
    salary: 110000,
    location: "New York, NY",
    avatar: "LT",
    performance: 90,
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.w@company.com",
    phone: "+1 (555) 678-9012",
    role: "Financial Analyst",
    department: "Finance",
    status: "probation",
    joinDate: "2024-01-15",
    salary: 95000,
    location: "Boston, MA",
    avatar: "JW",
    performance: 72,
  },
  {
    id: "7",
    name: "Anna Martinez",
    email: "anna.m@company.com",
    phone: "+1 (555) 789-0123",
    role: "UX Designer",
    department: "Design",
    status: "active",
    joinDate: "2022-03-01",
    salary: 105000,
    location: "Seattle, WA",
    avatar: "AM",
    performance: 94,
  },
  {
    id: "8",
    name: "Robert Taylor",
    email: "robert.t@company.com",
    phone: "+1 (555) 890-1234",
    role: "Operations Lead",
    department: "Operations",
    status: "terminated",
    joinDate: "2021-07-20",
    salary: 115000,
    location: "Denver, CO",
    avatar: "RT",
    performance: 65,
  },
  {
    id: "9",
    name: "Jennifer Lee",
    email: "jen.l@company.com",
    phone: "+1 (555) 901-2345",
    role: "Backend Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-06-01",
    salary: 130000,
    location: "San Francisco, CA",
    avatar: "JL",
    performance: 89,
  },
  {
    id: "10",
    name: "Chris Brown",
    email: "chris.b@company.com",
    phone: "+1 (555) 012-3456",
    role: "Sales Representative",
    department: "Sales",
    status: "active",
    joinDate: "2023-09-15",
    salary: 75000,
    location: "Miami, FL",
    avatar: "CB",
    performance: 82,
  },
];

const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    type: "hire",
    employeeName: "James Wilson",
    description: "Joined as Financial Analyst in Finance",
    timestamp: "2 hours ago",
  },
  {
    id: "a2",
    type: "leave",
    employeeName: "David Kim",
    description: "Started parental leave until June 15",
    timestamp: "5 hours ago",
  },
  {
    id: "a3",
    type: "review",
    employeeName: "Sarah Johnson",
    description: "Q2 performance review completed - Excellent",
    timestamp: "1 day ago",
  },
  {
    id: "a4",
    type: "promotion",
    employeeName: "Emily Rodriguez",
    description: "Promoted to Sales Director",
    timestamp: "2 days ago",
  },
  {
    id: "a5",
    type: "termination",
    employeeName: "Robert Taylor",
    description: "Employment terminated - mutual agreement",
    timestamp: "3 days ago",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────

const statusConfig: Record<
  EmployeeStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  active: {
    label: "Active",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "on-leave": {
    label: "On Leave",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  terminated: {
    label: "Terminated",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
  probation: {
    label: "Probation",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
};

const activityConfig: Record<
  ActivityItem["type"],
  { icon: React.ReactNode; color: string }
> = {
  hire: { icon: <UserPlus size={14} />, color: "text-emerald-600 bg-emerald-50" },
  leave: { icon: <Clock size={14} />, color: "text-amber-600 bg-amber-50" },
  review: { icon: <CheckCircle2 size={14} />, color: "text-blue-600 bg-blue-50" },
  promotion: { icon: <TrendingUp size={14} />, color: "text-purple-600 bg-purple-50" },
  termination: { icon: <AlertCircle size={14} />, color: "text-red-600 bg-red-50" },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ─── Main Component ──────────────────────────────────────────────────

export default function EmployerDashboard() {
  // State
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | "all">("all");
  const [deptFilter, setDeptFilter] = useState<Department | "all">("all");
  const [sortField, setSortField] = useState<keyof Employee>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "Engineering",
    status: "active",
    salary: 0,
    location: "",
  });

  // ─── Derived Data ────────────────────────────────────────────────────

  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }

    if (deptFilter !== "all") {
      result = result.filter((e) => e.department === deptFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [employees, searchQuery, statusFilter, deptFilter, sortField, sortDirection]);

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "active").length;
    const onLeave = employees.filter((e) => e.status === "on-leave").length;
    const newHires = employees.filter((e) => {
      const joinDate = new Date(e.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate >= thirtyDaysAgo;
    }).length;
    const avgPerformance =
      employees.reduce((sum, e) => sum + e.performance, 0) / (total || 1);

    return { total, active, onLeave, newHires, avgPerformance };
  }, [employees]);

  const deptData = useMemo(() => {
    const counts: Record<string, number> = {};
    DEPARTMENTS.forEach((d) => (counts[d] = 0));
    employees.forEach((e) => {
      counts[e.department] = (counts[e.department] || 0) + 1;
    });
    return DEPARTMENTS.map((d) => ({ name: d, count: counts[d] }));
  }, [employees]);

  // ─── Handlers ────────────────────────────────────────────────────────

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "Engineering",
      status: "active",
      salary: 0,
      location: "",
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({ ...employee });
    setIsEditModalOpen(true);
  };

  const openViewModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleSaveEmployee = (isEdit: boolean) => {
    if (!formData.name || !formData.email || !formData.role) return;

    if (isEdit && editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === editingEmployee.id
            ? ({ ...e, ...formData } as Employee)
            : e
        )
      );
      setIsEditModalOpen(false);
      setEditingEmployee(null);
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        role: formData.role || "",
        department: (formData.department as Department) || "Engineering",
        status: (formData.status as EmployeeStatus) || "active",
        joinDate: new Date().toISOString().split("T")[0],
        salary: formData.salary || 0,
        location: formData.location || "",
        avatar: formData.name
          ? formData.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          : "??",
        performance: Math.floor(Math.random() * 30) + 70,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      setIsAddModalOpen(false);
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "Engineering",
      status: "active",
      salary: 0,
      location: "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this employee?")) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building2 className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  WorkForce
                </h1>
                <p className="text-xs text-slate-500">Employer Dashboard</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <Search size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 relative">
                <Activity size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-semibold text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">HR Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                  AU
                </div>
              </div>
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
            <p className="text-sm font-semibold text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">HR Manager</p>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Employee Management</h2>
            <p className="text-slate-500 mt-1">
              Manage your team, track performance, and oversee operations
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              <Plus size={18} />
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Employees"
            value={stats.total}
            icon={<Users size={22} className="text-blue-600" />}
            trend="+12%"
            trendUp={true}
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Active Now"
            value={stats.active}
            icon={<UserCheck size={22} className="text-emerald-600" />}
            trend="+5%"
            trendUp={true}
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="On Leave"
            value={stats.onLeave}
            icon={<UserX size={22} className="text-amber-600" />}
            trend="-2%"
            trendUp={false}
            bgColor="bg-amber-50"
          />
          <StatCard
            title="New Hires (30d)"
            value={stats.newHires}
            icon={<UserPlus size={22} className="text-purple-600" />}
            trend="+3"
            trendUp={true}
            bgColor="bg-purple-50"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Employee Table (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email, role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as EmployeeStatus | "all")}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="probation">Probation</option>
                    <option value="terminated">Terminated</option>
                  </select>
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value as Department | "all")}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="all">All Departments</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-1">
                          Employee
                          {sortField === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("role")}
                      >
                        <div className="flex items-center gap-1">
                          Role
                          {sortField === "role" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("department")}
                      >
                        <div className="flex items-center gap-1">
                          Department
                          {sortField === "department" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center gap-1">
                          Status
                          {sortField === "status" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("performance")}
                      >
                        <div className="flex items-center gap-1">
                          Performance
                          {sortField === "performance" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            ))}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Users size={40} className="text-slate-300" />
                            <p className="text-sm">No employees found</p>
                            <p className="text-xs">Try adjusting your filters</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee) => {
                        const status = statusConfig[employee.status];
                        return (
                          <tr
                            key={employee.id}
                            className="hover:bg-slate-50/60 transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex items-center justify-center border-2 border-white shadow-sm">
                                  {employee.avatar}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">
                                    {employee.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {employee.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-900 font-medium">
                                {employee.role}
                              </p>
                              <p className="text-xs text-slate-500">
                                {formatCurrency(employee.salary)}/yr
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                <Briefcase size={12} />
                                {employee.department}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                                />
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                                  <div
                                    className={`h-full rounded-full ${
                                      employee.performance >= 90
                                        ? "bg-emerald-500"
                                        : employee.performance >= 75
                                        ? "bg-blue-500"
                                        : "bg-amber-500"
                                    }`}
                                    style={{ width: `${employee.performance}%` }}
                                  />
                                </div>
                                <span className="text-xs font-semibold text-slate-700 w-8">
                                  {employee.performance}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => openViewModal(employee)}
                                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="View"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => openEditModal(employee)}
                                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(employee.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/30 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Showing <span className="font-semibold text-slate-900">{filteredEmployees.length}</span> of{" "}
                  <span className="font-semibold text-slate-900">{employees.length}</span> employees
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-white border border-slate-200 rounded-md transition-colors disabled:opacity-50">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-white border border-slate-200 rounded-md transition-colors disabled:opacity-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Department Breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-blue-600" />
                Departments
              </h3>
              <div className="space-y-3">
                {deptData.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">
                          {dept.name}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {dept.count}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${(dept.count / stats.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-blue-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((activity) => {
                  const config = activityConfig[activity.type];
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.color}`}
                      >
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 font-medium leading-tight">
                          {activity.employeeName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {activity.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                View All Activity
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <QuickActionButton
                  icon={<UserPlus size={20} />}
                  label="Add Employee"
                  color="blue"
                  onClick={openAddModal}
                />
                <QuickActionButton
                  icon={<Calendar size={20} />}
                  label="Time Off"
                  color="emerald"
                />
                <QuickActionButton
                  icon={<DollarSign size={20} />}
                  label="Payroll"
                  color="purple"
                />
                <QuickActionButton
                  icon={<GraduationCap size={20} />}
                  label="Training"
                  color="amber"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Modals ─────────────────────────────────────────────────────── */}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <EmployeeModal
          title="Add New Employee"
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsAddModalOpen(false)}
          onSave={() => handleSaveEmployee(false)}
          departments={DEPARTMENTS}
        />
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && editingEmployee && (
        <EmployeeModal
          title="Edit Employee"
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEmployee(null);
          }}
          onSave={() => handleSaveEmployee(true)}
          departments={DEPARTMENTS}
        />
      )}

      {/* View Employee Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-slate-900">Employee Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 font-bold text-xl flex items-center justify-center border-4 border-blue-50">
                  {selectedEmployee.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {selectedEmployee.name}
                  </h4>
                  <p className="text-slate-500">{selectedEmployee.role}</p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      statusConfig[selectedEmployee.status].bg
                    } ${statusConfig[selectedEmployee.status].text}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        statusConfig[selectedEmployee.status].dot
                      }`}
                    />
                    {statusConfig[selectedEmployee.status].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoItem
                  icon={<Mail size={16} />}
                  label="Email"
                  value={selectedEmployee.email}
                />
                <InfoItem
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={selectedEmployee.phone}
                />
                <InfoItem
                  icon={<MapPin size={16} />}
                  label="Location"
                  value={selectedEmployee.location}
                />
                <InfoItem
                  icon={<Briefcase size={16} />}
                  label="Department"
                  value={selectedEmployee.department}
                />
                <InfoItem
                  icon={<Calendar size={16} />}
                  label="Join Date"
                  value={formatDate(selectedEmployee.joinDate)}
                />
                <InfoItem
                  icon={<DollarSign size={16} />}
                  label="Salary"
                  value={formatCurrency(selectedEmployee.salary)}
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Performance Score
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {selectedEmployee.performance}%
                  </span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      selectedEmployee.performance >= 90
                        ? "bg-emerald-500"
                        : selectedEmployee.performance >= 75
                        ? "bg-blue-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${selectedEmployee.performance}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  openEditModal(selectedEmployee);
                }}
                className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  bgColor,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${bgColor}`}>{icon}</div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            trendUp ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{title}</p>
    </div>
  );
}

function QuickActionButton({
  icon,
  label,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  color: "blue" | "emerald" | "purple" | "amber";
  onClick?: () => void;
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${colors[color]}`}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-slate-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function EmployeeModal({
  title,
  formData,
  setFormData,
  onClose,
  onSave,
  departments,
}: {
  title: string;
  formData: Partial<Employee>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Employee>>>;
  onClose: () => void;
  onSave: () => void;
  departments: Department[];
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <FormField label="Full Name" required>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="John Doe"
            />
          </FormField>

          <FormField label="Email" required>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="john@company.com"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone">
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="+1 (555) 000-0000"
              />
            </FormField>
            <FormField label="Location">
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="City, State"
              />
            </FormField>
          </div>

          <FormField label="Role" required>
            <input
              type="text"
              value={formData.role || ""}
              onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Software Engineer"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Department">
              <select
                value={formData.department || "Engineering"}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, department: e.target.value as Department }))
                }
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Status">
              <select
                value={formData.status || "active"}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, status: e.target.value as EmployeeStatus }))
                }
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="probation">Probation</option>
                <option value="terminated">Terminated</option>
              </select>
            </FormField>
          </div>

          <FormField label="Annual Salary">
            <div className="relative">
              <DollarSign
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="number"
                value={formData.salary || 0}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, salary: Number(e.target.value) }))
                }
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </FormField>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 flex gap-3">
          <button
            onClick={onSave}
            className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Employee
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}