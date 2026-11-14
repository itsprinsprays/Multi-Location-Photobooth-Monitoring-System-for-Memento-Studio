import { Info, X } from "lucide-react";
import { employeeService } from "../../services/employeeService";
import { useState } from "react";

export default function CreateEmployee({onClose, onLoadEmployees}) {

    const [employee, setEmployee] = useState({
        employeeName: "",
        email: "",
        contactNumber: "",
        username: "",
        password: "",
        employeeRole: "STAFF"
   })
   const [error, setError] = useState(null);

   function handleChange(e) {
    setEmployee({
        ...employee,
        [e.target.name]: e.target.value
    })
   }

   async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try{

            if(!employee.employeeName.trim()) {
                setError("Employee Name is required");
                return;
            }

            if(!employee.email.trim()){
                setError("Email is required");
                return;
            }

            if(!employee.contactNumber.trim()) {
                setError("Contact Number is required");
                return;
            }

            if(!employee.username.trim()) {
                setError("Username is required");
                return;
            }

            if(!employee.password.trim()) {
                setError("Temporary password is required");
                return;
            }

            if(!employee.employeeRole.trim()) {
                setError("Employee Role is required");
                return;
            }

            await employeeService.createEmployee(employee);
            if(onLoadEmployees) onLoadEmployees();
            onClose();
        } catch(error) {
            setError(error.message || "Failed to Create Employee")
        }
    
   }

    return(
        <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-6 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">

                <div className="flex justify-between items-center ">
                    <div className="p-4">
                        <p className="text-xl font-bold">Create Employee Account</p>
                        <p className="text-slate-500 text-xs sm:text-sm ">Add an employee and assign their login credentials.</p>
                    </div>

                    <button 
                        onClick={onClose} 
                        className="p-1.5 mr-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                        <X className="w-5 h-5" />
                        </button>
                </div>
                <div className="border rounded-lg border-gray-300 m-4">

                    <div className="">
                        <p className="font-medium py-2 px-4">Personal Details</p>

                        <form onSubmit={handleSubmit}>
                            <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <p className="font-medium text-sm">Full name *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        value={employee.employeeName}
                                        name="employeeName"
                                        onChange={handleChange}
                                        className="outline outline-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs placeholder:text-xs w-full"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium text-sm">Work email *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter work email"
                                        value={employee.email}
                                        name="email"
                                        onChange={handleChange}
                                        className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                        />
                                    </div>

                                <div>
                                        <p className="font-medium text-sm">Contact number *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter contact number"
                                        value={employee.contactNumber}
                                        name="contactNumber"
                                        onChange={handleChange}
                                        className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                        />
                                    </div>
                                </div>

                                <hr className="border-gray-300 border my-4"/>

                                <div className="grid grid-cols-1 gap-4 ">
                                    <div>
                                        <p className="font-medium text-sm">Username *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter username"
                                        value={employee.username}
                                        name="username"
                                        onChange={handleChange}
                                        className="w-full outline outline-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-1 placeholder:text-xs"
                                        />
                                        <p className="text-slate-400 text-xs">Enter a unique username</p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-sm">Temporary Password *</p>
                                        <input
                                        type="password"
                                        placeholder="Enter temporary password"
                                        value={employee.password}
                                        name="password"
                                        onChange={handleChange}
                                        className="w-full outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-1 placeholder:text-xs"
                                        />
                                        <p className="text-slate-400 text-xs">Share securely with the employee</p>
                                    </div>

                                    <div className="col-span-2 flex flex-col w-full">
                                        <label className="font-medium text-sm mb-1">Role / Access *</label>
                                        <select 
                                            value={employee.employeeRole}
                                            name="employeeRole"
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-2.5 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                                            <option value="STAFF">Staff</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex my-2 bg-gray-100 rounded-lg p-2 gap-2 items-center">
                                    <Info className="text-slate-500"/>
                                    <div>
                                        <p className="font-medium text-xs">Employee Id, Work Status and Creation date are automatic</p>
                                        <p className="text-slate-400 text-xs">It will be generated when you add this employee</p>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-300"/>
                            
                            <div className="p-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
                                {error ? (
                                    <p className="text-red-500 text-xs font-medium">{error}</p>
                                ) : (
                                    <p className="text-slate-400 text-xs">Access is granted after account creation</p>
                                )}
                                
                                <div className="flex gap-2">
                                    <button className="border border-gray-300 p-2 rounded-lg" type="submit" onClick={onClose}>Cancel</button>
                                    <button className="bg-black text-white p-2 rounded-lg" type="submit">Create Employee Account</button>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}
