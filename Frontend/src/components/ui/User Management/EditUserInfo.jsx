import { useState } from "react"


export default function EditUserInfo({onClose, employee}) {

    const [editInfo, setEditInfo] = useState({
        employeeName: employee?.employeeName || "Employee Name cant fetch",
        email: employee?.email || "Email cant fetch",
        contactNumber: employee?.contactNumber || "Contact Number cant fetch",
        employeeRole: employee?.employeeRole || "Employee Role cant fetch"
    });

    return(
        <>
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Edit Employee</h1>
                    <p className="text-slate-500 text-xs sm:text-sm">Update employee information and account details.</p>
                </div>

                <div className="border p-4 rounded-xl border-gray-400 flex flex-col gap-5">

                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold text-lg">{employee.employeeName}</p>
                            <p className="text-slate-400 text-xs font-medium">Employee ID - {employee.employeeId}</p>
                        </div>
                        
                        <p>{employee.workStatus}</p>
                    </div>


                    <p className="font-semibold">Personal Information</p>
                    <form>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium text-sm">First Name </p>
                                <input 
                                type="text"
                                value={editInfo.employeeName}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"/>
                            </div>

                            <div>
                                <label className="font-medium text-sm">Account Role </label>
                                <select
                                type="text"
                                value={editInfo.employeeRole}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full">
                                    <option>Staff</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            
                            <div>
                                <p className="font-medium text-sm">Work Email</p>
                                <input 
                                type="text"
                                value={editInfo.email}
                                placeholder="Enter new name"
                                className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                />
                            </div>

                            <div>
                                <p className="font-medium text-sm">Contact Number</p>
                                <input 
                                type="text"
                                value={editInfo.contactNumber}
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
                                className="outline outline-gray-400 p-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                />
                            </div>

                            <div>
                                <p className="font-medium text-sm">Contact Number</p>
                                <input 
                                type="text"
                                value={employee.creationDate}
                                placeholder="Enter new name"
                                disabled
                                className="outline outline-gray-400 p-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                />
                            </div>
                        </div>

                    <div className="bg-gray-200 rounded-lg p-4 mt-4">
                        <p className="font-medium text-xs">Employee Portal access only</p>
                        <p className="text-slate-400 text-xs">Employee ID and role are managed by the system. Online status reflects the current sign-in session.</p>
                    </div>
                    
                    <div className="flex justify-end gap-4 mt-4">
                        <button className="border border-gray-400 p-3 rounded-lg">Cancel</button>
                        <button className="bg-black text-white p-3 rounded-lg">Save Changes</button>
                    </div>

                  </form>
                </div>
            </div>
        </>
    )
}