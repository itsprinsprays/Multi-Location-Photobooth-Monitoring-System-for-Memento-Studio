import { ArrowLeft, Search } from "lucide-react";


export default function EmployeeArchived() {
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
                        <p className="font-bold text-xl">2</p>
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

                <div className="border rounded-lg border-gray-400 py-2">

                    <div className="flex justify-between p-4">
                        <p className="font-semibold">Former employee records</p>
                        <p>employees</p>
                    </div>

                    <table className="w-full text-left border border-gray-400 ">
                        <thead>
                            <tr className="text-xs border-y-1 border-gray-400 bg-gray-200">
                                <th className="p-2">EMPLOYEE ID</th>
                                <th className="p-2">EMPLOYEE NAME</th>
                                <th className="p-2">WORK EMAIL</th>
                                <th className="p-2">CONTACT</th>
                                <th className="p-2">ACTION</th>
                            </tr>
                        </thead>
                    </table>


                </div>

            </div>
        </>
    )
}