import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { employeeService } from "../services/employeeService";
import UserSummaryCard from "../components/card/User Management/UserSummaryCard";


export default function UserManagement() {

    const [error, setError] = useState("");
    const [employee, setEmployee] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [summary, setSummary] = useState(null);
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
            const statusParam = selectedStatus ? selectedStatus.toUpperCase() : null;
            const data = await employeeService.getAllEmployees(0, 5, statusParam, searchTerm);
            setEmployee(data.content || []);
        } catch(error) {
            setError(error.message || "Employee Table Faied to fetch");
        }
    }

    useEffect(() => {
        getSummary();
    }, [])

    useEffect(() => {
        loadEmployee();
    }, [selectedStatus, searchTerm])


    return(
        <>
            <div className="p-5">

                <div className="flex flex-col gap-4">

                    <div className="flex flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold">User Management</h1>
                            <p>Manage employee accounts, monitor status, and archive departed employees.</p>
                        </div>
                        
                        <div className="flex items-center p-2 bg-black text-white rounded-lg gap-2 px-4">
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

                    <div className="flex gap-2">

                        <div className="flex items-center gap-2 border p-2 rounded-lg border-gray-400 ">
                            <Search className="h-5 w-5 text-slate-600"/>
                            <input
                            type="text"
                            placeholder="Search Employee ID or name"
                            className="outline-none"
                            />
                        </div>

                        <select
                        className="border rounded p-2 border-gray-400">
                            <option>All Status</option>
                            <option>Online</option>
                            <option value="">Offline</option>
                        </select>
                        
                    </div>

                    <div className="border rounded-xl border-gray-400">
                        <div className="p-4">
                            <h1 className="font-semibold">Employee Directory</h1>
                        </div>
                        
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs text-left border-y-1 border-gray-400 bg-gray-200">
                                    <th className="p-2">EMPLOYEE ID</th>
                                    <th className="p-2">EMPLOYEE NAME</th>
                                    <th className="p-2">STATUS</th>
                                    <th className="p-2">ROLE</th>
                                    <th className="p-2">WORK EMAIL</th>
                                    <th className="p-2">CONTACT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.map((employee) => (
                                    <tr key={employee.employeeId} className="hover:bg-gray-100">
                                        <td className="p-2">{employee.employeeId}</td>
                                        <td className="p-2">{employee.employeeName}</td>
                                        <td className="p-2">{employee.workStatus}</td>
                                        <td className="p-2">{employee.employeeRole}</td>
                                        <td className="p-2">{employee.email}</td> 
                                        <td className="p-2">{employee.contactNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}