import { ArrowLeft, Search, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { employeeService } from "../../../services/employeeService";
import { Link } from "react-router-dom"

export default function EmployeeArchived() {

    const [error, setError] = useState(null);
    const [summary, setSummary] = useState("");
    const [archiveEmployee, setArchiveEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1); 

    async function restoreEmployee(employeeId) {
        try {
            setError(null);
            await employeeService.restoreEmployee(employeeId);
            await archiveEmployeeFunction();
            await archivedSummary();
        } catch(error) {
            setError(error.message || "Restore Failed");
        }
    }

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
            const data = await employeeService.getAllArchiveEmployees(currentPage, 5, searchTerm);
            setArchiveEmployee(data.content || [])
            setTotalPages(data.totalPages || 1);
        } catch(error) {
            setError(error.message || "Failed to Fetch")
        }
    }

    useEffect(() => {
        archiveEmployeeFunction();
    }, [currentPage, searchTerm])

    return(
        <>
            <div className="p-4 flex flex-col gap-6">

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Archived Employees</h1>
                        <p className="text-slate-500 text-xs sm:text-sm">View archived records of employees who have left the company.</p>
                    </div>

                    <Link to="/user-management" className="flex items-center p-4 border border-gray-400 rounded-lg gap-1">
                        <ArrowLeft className="h-5 w-5"/>
                         <span className="font-semibold">User Management</span>
                    </Link>
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
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(0);
                    }}
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
                        {archiveEmployee.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500">
                                    No archived employees found.
                                </td>
                            </tr>
                        ) : (
                            archiveEmployee.map((employee) => (
                                <tr key={employee.employeeId} className="hover:bg-gray-200">
                                    <td className="p-4">{employee.employeeId}</td>
                                    <td className="p-4">{employee.employeeName}</td>
                                    <td className="p-4">{employee.email}</td>
                                    <td className="p-4">{employee.contactNumber}</td>
                                    <td className="p-4">
                                        <button className="flex items-center gap-1 p-2 rounded-lg bg-black text-white" onClick={() => restoreEmployee(employee.employeeId)}>
                                            <RotateCcw className="w-4 h-4"/>
                                            <span>Restore</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>

                    </table>
                        <div className="flex items-center justify-between mt-2 text-sm text-slate-500 mb-4 px-2">
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

                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

            </div>
        </>
    )
}