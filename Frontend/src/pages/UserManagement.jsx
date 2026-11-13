import { Plus, Search, ArchiveX } from "lucide-react";
import { useState, useEffect } from "react";
import { employeeService } from "../services/employeeService";
import UserSummaryCard from "../components/card/User Management/UserSummaryCard";
import CreateEmployee from "../components/modals/CreateEmployee";

  function formatDate(dateString) {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    }

    const workStatusBadges = {
    ON_DUTY: "bg-green-100 text-green-700 border border-green-200 py-1 px-2 rounded-2xl",
    OFF_DUTY: "bg-red-100 text-red-700 border border-red-200 py-1 px-2 rounded-2xl",
    };


export default function UserManagement() {

    const [error, setError] = useState("");
    const [employee, setEmployee] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [summary, setSummary] = useState(null);

    const [createEmployee, setCreateEmployee] = useState(false);

      const summaryBreakdown = [
    { label: "TOTAL EMPLOYEES", count: summary?.totalEmployee, bgColor: "bg-black text-white", dotColor: "bg-violet-500", description: "Non-Archived accounts" },
    { label: "ONLINE", count: summary?.onlineEmployee, bgColor: "bg-white border border-gray-400", dotColor: "bg-emerald-500", description: "Employed: Sign in" },
    { label: "OFFLINE", count: summary?.offlineEmployee, bgColor: "bg-white border border-gray-400", dotColor: "bg-rose-500", description: "Employed: Signed out" },
    ];


    async function getSummary(){
        try{
            setSummary(await employeeService.getSummary());
        } catch(error) {
            setError(error.message || "Summary Failed to fetch");
        }
    }

    async function loadEmployee() {
        try {
            const roleParam = selectedRole ? selectedRole.toUpperCase() : null; 
            const workStatusParam = selectedStatus ? selectedStatus.toUpperCase() : null;
            const data = await employeeService.getAllEmployees(currentPage, 5, roleParam, workStatusParam, searchTerm);
            setEmployee(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch(error) {
            setError(error.message || "Employee Table Faied to fetch");
        }
    }

    useEffect(() => {
        getSummary();
    }, [])

    useEffect(() => {
        loadEmployee();
    }, [selectedRole, selectedStatus, searchTerm, currentPage])


    return(
        <>
            <div className="p-5">

                <div className="flex flex-col gap-4">

                    <div className="flex flex justify-between items-center">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
                            <p className="text-slate-500 text-xs sm:text-sm">Manage employee accounts, monitor status, and archive departed employees.</p>
                        </div>
                        
                        <div className="flex items-center p-2 bg-black text-white rounded-lg gap-2 px-4 cursor-pointer" onClick={() => setCreateEmployee(true)}>
                            <Plus className="h-4 w-4"/>
                            <span>Create Employee</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {summaryBreakdown.map((item) => (
                            <UserSummaryCard key={item.label}
                            label={item.label}
                            count={item.count}
                            bgColor={item.bgColor}
                            dotColor={item.dotColor}
                            description={item.description}/>

                        ))}
                    </div>

                    <div className="flex justify-between gap-2">
                        
                        <div className="flex gap-3 flex-wrap items-center flex-1">
                            <div className="flex items-center gap-2 border p-2 rounded-lg border-gray-400 w-full sm:w-72 ">
                                <Search className="h-5 w-5 text-slate-600"/>
                                <input
                                type="text"
                                placeholder="Search Employee ID or name"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value); 
                                    setCurrentPage(0);
                                }}
                                className="outline-none w-full"
                                />
                            </div>

                            <select
                            id="role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="border rounded p-2 border-gray-400">
                                <option value="">All Roles</option>
                                <option value="ADMIN">Admin</option>
                                <option value="STAFF">Staff</option>
                            </select>

                            <select
                            id="workStatus"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border rounded p-2 border-gray-400">
                                <option value="">All Status</option>
                                <option value="ON_DUTY">On-Duty</option>
                                <option value="OFF_DUTY">Off-Duty</option>
                            </select>
                        </div>

                        <div className="flex items-center bg-red-500 text-white p-2 rounded-lg gap-2">
                            <ArchiveX className="w-5 h-5"/>
                            <span>Archived Employees</span>
                        </div>
                    </div>

                    <div className="border rounded-xl border-gray-400">
                        <div className="p-4 flex justify-between items-center">
                            <h1 className="font-semibold">Employee Directory</h1>
                            <p className="text-slate-500 text-xs">Employee Portal accounts only</p>
                        </div>
                        
                        <table className="w-full border-b border-gray-300">
                            <thead>
                                <tr className="text-xs text-left border-y-1 border-gray-300 bg-gray-200">
                                    <th className="p-2">EMPLOYEE ID</th>
                                    <th className="p-2">EMPLOYEE NAME</th>
                                    <th className="p-2">USERNAME</th>
                                    <th className="p-2">WORK STATUS</th>
                                    <th className="p-2">ROLE</th>
                                    <th className="p-2">WORK EMAIL</th>
                                    <th className="p-2">CONTACT</th>
                                    <th className="p-2">CREATION DATE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {employee.map((employee) => (
                                    <tr key={employee.employeeId} className="hover:bg-gray-200">
                                        <td className="p-2">{employee.employeeId}</td>
                                        <td className="p-2">{employee.employeeName}</td>
                                        <td className="p-2">{employee.username}</td>
                                        <td className="p-2">
                                            <span className = {`text-xs flex items-center justify-center gap-2 ${workStatusBadges[employee.workStatus]}`}>
                                                {employee.workStatus === "ON_DUTY" 
                                                ? <span className="w-2 h-2 bg-[green] rounded-full"/>
                                                : <span className="w-2 h-2 bg-[red] rounded-full"/> }
                                                
                                                {employee.workStatus === "ON_DUTY" ? "ON_DUTY" : "OFF_DUTY"}
                                            </span>
                                        </td>
                                        <td className="p-2">{employee.employeeRole}</td>
                                        <td className="p-2">{employee.email}</td> 
                                        <td className="p-2">{employee.contactNumber}</td>
                                        <td>{formatDate(employee.creationDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex items-center justify-between mt-2 text-sm text-slate-500 mb-4">
                            <p>
                                Page <span className="font-semibold text-slate-800">{currentPage + 1}</span> of{" "}
                                <span className="font-semibold text-slate-800">{totalPages}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-medium text-slate-700">
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={currentPage >= totalPages - 1}
                                    className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-medium text-slate-700">
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {createEmployee && <CreateEmployee />}
        </>
    )
}