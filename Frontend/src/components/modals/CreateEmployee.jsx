import { Info } from "lucide-react";


export default function CreateEmployee() {
    return(
        <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl w-full max-w-2xl overflow-y-auto shadow-lg">

                <div className="p-4">
                    <p className="text-xl font-bold">Create Employee Account</p>
                    <p className="text-slate-500 text-xs sm:text-sm ">Add an empployee and assign their login credentials.</p>
                </div>

                <div className="border rounded-lg border-gray-400 m-4">
                    <div className="flex justify-between items-center p-4">
                        <div className="">
                            <p className="text-slate-500 text-xs font-bold">EMPLOYEE ACCOUNT</p>
                            <p className="text-lg font-semibold">Employee details & access</p>
                        </div>
                        <p className="text-xs text-slate-400">Required fields are marked *</p>
                    </div>

                    <hr className="border-gray-400"/>

                    <div className="">
                        <p className="font-medium py-2 px-4">Personal Details</p>

                        <form className="">
                            <div className="p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-medium">Full name *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="outline outline-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium">Work email *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                                        />
                                    </div>

                                <div>
                                        <p className="font-medium">Contact number *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                                        />
                                    </div>
                                </div>

                                <hr className="border-gray-400 border my-4"/>

                                <div className="grid grid-cols-2 gap-4 ">
                                    <div>
                                        <p className="font-medium">Username *</p>
                                        <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="w-full outline outline-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-1"
                                        />
                                        <p className="text-slate-400 text-xs">Enter a unique username</p>
                                    </div>

                                    <div>
                                        <p className="font-medium">Temporary Password *</p>
                                        <input
                                        type="password"
                                        placeholder="Enter Full Name"
                                        className="w-full outline outline-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-1"
                                        />
                                        <p className="text-slate-400 text-xs">Share securely with the employee</p>
                                    </div>

                                    <div className="col-span-2 flex flex-col w-full">
                                        <label className="font-medium mb-1">Role / Access *</label>
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
                                        <p className="font-medium">Employee Id, Work Status and Creation date are automatic</p>
                                        <p className="text-slate-400 text-xs">It will be generated when you add this employee</p>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-400"/>
                            
                            <div className="p-4 flex justify-between items-center">
                                <p className="text-slate-400 text-xs">Access is granted after account creation</p>
                                
                                <div className="flex gap-2">
                                    <button className="border border-gray-400 p-2 rounded-lg">Cancel</button>
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