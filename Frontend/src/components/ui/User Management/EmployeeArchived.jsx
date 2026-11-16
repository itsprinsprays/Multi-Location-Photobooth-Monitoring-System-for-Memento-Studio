import { ArrowLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { employeeService } from "../../../services/employeeService";

export default function EmployeeArchived() {

    const [error, setError] = useState(null);
    const [summary, setSummary] = useState("");
    const [archiveEmployee, setArchiveEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    async function archivedSummary() {
        try {
           setSummary(await employeeService.getArchiveSummary());
        } catch(error) {
            setError(error.message || "Summary failed to fetch")
        }
    }

    useEffect(() => {
        archivedSummary();
    }, [])

    async function archiveEmployeeFunction() {
        try {
            const data = await employeeService.getAllArchiveEmployees(0, 5, searchTerm);
            setArchiveEmployee(data.content || [])
        } catch(error) {
            setError(error.message || "Failed to Fetch")
        }
    }

    useEffect(() => {
        archiveEmployeeFunction();
    }, [])

    return(
        <>
            <div className="p-4 flex flex-col gap-6">

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Archived Employees</h1>
                        <p className="text-slate-500 text-xs sm:text-sm">View archived records of employees who have left the company.</p>
                    </div>

                    <button className="flex items-center p-4 border border-gray-400 rounded-lg gap-1">
                        <ArrowLeft className="h-5 w-5"/>
                         <span className="font-semibold">User Management</span>
                    </button>
                </div>

                <div className="flex gap-16 p-6 border rounded-lg border-gray-400">
                    <div className="">
                        <p className="text-sm text-slate-500 tracking-wide font-semibold text-xs">ARCHIVED EMPLOYEES</p>
                        <p className="font-bold text-xl">{summary?.total}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Former employees only</p>
                        <p className="text-slate-500 text-sm">These employees have left the company. Their employee history is preserved in the archive</p>
                    </div>

                </div>

                <div className="flex items-center gap-2 border p-2 rounded-lg border-gray-400 w-full sm:w-72 ">
                    <Search className="h-5 w-5 text-slate-600"/>
                    <input 
                    type="text" 
                    placeholder="Search Employee ID or Name"
                    className="w-full"
                    />
                </div>

                <div className="border rounded-lg border-gray-400 overflow-hidden">

                    <div className="flex justify-between p-4">
                        <p className="font-semibold">Former employee records</p>
                        <p className="bg-gray-200 p-1 rounded-full">{summary?.total} employees</p>
                    </div>

                    <table className="w-full text-left border border-gray-400 ">
                        <thead>
                            <tr className="text-xs border-y-1 border-gray-400 bg-gray-200 text-slate-500">
                                <th className="p-2">EMPLOYEE ID</th>
                                <th className="p-2">EMPLOYEE NAME</th>
                                <th className="p-2">WORK EMAIL</th>
                                <th className="p-2">CONTACT</th>
                                <th className="p-2">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y  divide-gray-400">
                        {archiveEmployee.map((employee) => (
                            <tr key={employee.employeeId} className="hover:bg-gray-200">
                                <td className="p-4">{employee.employeeId}</td>
                                <td className="p-4">{employee.employeeName}</td>
                                <td className="p-4">{employee.email}</td>
                                <td className="p-4">{employee.contactNumber}</td>
                                <td className="p-4">
                                    <button>Restore</button>
                                </td>
                            </tr>
                        ))}

                        </tbody>

                    </table>
                    <div className="flex justify-between p-4 bg-gray-200">
                        <p>Showing archived employees</p>
                        <p>Employee history retained</p>
                    </div>

                </div>

            </div>
        </>
    )
}