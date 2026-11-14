import { useState } from "react"
import { employeeService } from "../../../services/employeeService";

  function formatDate(dateString) {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    }

export default function EditUserInfo({onClose, employee, loadEmployees}) {

    const [editInfo, setEditInfo] = useState({
        employeeName: employee?.employeeName || "Employee Name cant fetch",
        email: employee?.email || "Email cant fetch",
        contactNumber: employee?.contactNumber || "Contact Number cant fetch",
        employeeRole: employee?.employeeRole || "Employee Role cant fetch"
    });

    const [error, setError] = useState(null);

    const workStatusBadge = {
        ON_DUTY: "bg-green-200 text-green-500 rounded-full p-2",
        OFF_DUTY: "bg-red-200 text-red-500 rounded-full p-2 "
    }

    function handleChange(e) {
        setEditInfo({
            ...editInfo,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            await employeeService.updateEmployeeInfo(employee.employeeId, editInfo);
            loadEmployees();
            onClose();
        } catch(error) {
            setError(error.message || "Updating Failed")
        }

    }

    return(
        <>
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Edit Employee</h1>
                    <p className="text-slate-500 text-xs sm:text-sm">Update employee information and account details.</p>
                </div>

                <div className="border p-4 rounded-xl border-gray-400 flex flex-col gap-5 ">

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">{employee.employeeName}</p>
                            <p className="text-slate-400 text-xs font-medium">Employee ID - {employee.employeeId}</p>
                        </div>
                        
                        <p className={`${workStatusBadge[employee.workStatus]}`}>{employee.workStatus === "ON_DUTY" ? "On-Duty" : "Off-Duty"}</p>
                    </div>


                    <p className="font-semibold">Personal Information</p>
                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium text-sm">First Name </p>
                                <input 
                                type="text"
                                value={editInfo.employeeName}
                                name="employeeName"
                                onChange={handleChange}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"/>
                            </div>

                            <div>
                                <label className="font-medium text-sm">Account Role </label>
                                <select
                                type="text"
                                value={editInfo.employeeRole}
                                name="employeeRole"
                                onChange={handleChange}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full">
                                    <option value="STAFF">Staff</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            
                            <div>
                                <p className="font-medium text-sm">Work Email</p>
                                <input 
                                type="text"
                                value={editInfo.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                />
                            </div>

                            <div>
                                <p className="font-medium text-sm">Contact Number</p>
                                <input 
                                type="text"
                                value={editInfo.contactNumber}
                                name="contactNumber"
                                onChange={handleChange}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                />
                            </div>

                            <div>
                                <p className="font-medium text-sm">Employee ID</p>
                                <input 
                                type="text"
                                value={employee.employeeId}
                                placeholder="Enter new name"
                                disabled
                                className="outline outline-gray-400 p-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full text-slate-400"
                                />
                            </div>

                            <div>
                                <p className="font-medium text-sm">Creation Date</p>
                                <input 
                                type="text"
                                value={formatDate(employee.creationDate)}
                                placeholder="Enter new name"
                                disabled
                                className="outline outline-gray-400 p-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full text-slate-400"
                                />
                            </div>
                        </div>

                    <div className="bg-gray-200 rounded-lg p-4 mt-4">
                        <p className="font-medium text-xs">Employee Portal access only</p>
                        <p className="text-slate-400 text-xs">Employee ID and creation date are managed by the system. Online status reflects the current sign-in session.</p>
                    </div>
                    
                    <div className="flex justify-end gap-4 mt-4">
                        <button className="border border-gray-400 p-3 rounded-lg cursor-pointer" type="button" onClick={onClose}>Cancel</button>
                        <button className="bg-black text-white p-3 rounded-lg cursor-pointer">Save Changes</button>
                    </div>

                  </form>
                </div>
            </div>
        </>
    )
}