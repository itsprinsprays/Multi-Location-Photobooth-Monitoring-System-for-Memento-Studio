import { Info, X } from "lucide-react";


export default function CreateEmployee({onClose}) {
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

                        <form className="">
                            <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <p className="font-medium text-sm">Full name *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="outline outline-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs placeholder:text-xs w-full"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium text-sm">Work email *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter work email"
                                        className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 placeholder:text-xs w-full"
                                        />
                                    </div>

                                <div>
                                        <p className="font-medium text-sm">Contact number *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter contact number"
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
                                        className="w-full outline outline-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-1 placeholder:text-xs"
                                        />
                                        <p className="text-slate-400 text-xs">Enter a unique username</p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-sm">Temporary Password *</p>
                                        <input
                                        type="password"
                                        placeholder="Enter temporary password"
                                        className="w-full outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-1 placeholder:text-xs"
                                        />
                                        <p className="text-slate-400 text-xs">Share securely with the employee</p>
                                    </div>

                                    <div className="col-span-2 flex flex-col w-full">
                                        <label className="font-medium text-sm mb-1">Role / Access *</label>
                                        <select 
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
                                <p className="text-slate-400 text-xs">Access is granted after account creation</p>
                                
                                <div className="flex gap-2">
                                    <button className="border border-gray-300 p-2 rounded-lg">Cancel</button>
                                    <button className="bg-black text-white p-2 rounded-lg">Create Employee Account</button>
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