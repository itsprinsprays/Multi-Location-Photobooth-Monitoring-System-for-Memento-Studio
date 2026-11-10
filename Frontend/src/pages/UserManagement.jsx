import { Plus } from "lucide-react";


export default function UserManagement() {
    return(
        <>
            <div className="p-5">
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
            </div>
        </>
    )
}