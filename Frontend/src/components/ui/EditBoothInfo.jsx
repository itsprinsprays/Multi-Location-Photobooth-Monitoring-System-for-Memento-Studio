import { ArrowLeft, Pencil, Loader2 } from "lucide-react"
import { useState } from "react";
import { boothService } from "../../services/boothService";

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EditBoothInfo({onClose, booth, onUpdateBooth}) {

    const [editBooth, setEditBooth] = useState({
        boothName: booth?.boothName || "No Booth Name",
        boothLocation: booth?.boothLocation || "",
        boothType: booth?.boothType || "PERMANENT",
        boothStatus: booth?.boothStatus || "OFFLINE"
    })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setEditBooth({
            ...editBooth,
            [e.target.name]: e.target.value
        })
    }



    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);

            await boothService.updateBoothInfo(booth.boothId, editBooth);
            onUpdateBooth();
            onClose();
      
        } catch(error) {
            setError(error.message || "Update Failed");
        } finally {
            setLoading(false);
        }
    }
    

    return(
        <>
            <div className="p-4 flex flex-col gap-3">

                {/* First Row Div*/}
                <div className="flex items-center text-slate-500 gap-2 cursor-pointer" onClick={onClose}>
                    <ArrowLeft className="text-xs"/>
                    <h1 className="font-semibold text-xs sm:text-sm font-medium">Back to Booth Management</h1>
                </div>

                {/*Second Row Div */}
                <div>
                    <h1 className="text-2xl sm:text-3xl  lg:text-4xl font-bold">Update Booth Info</h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Edit the booth's details and configuration. Save your changes when you're done</p>
                </div>

                {/* Third Row Div */}
                <div className="w-full border border-gray-400 rounded-lg ">
                    <div className="w-full p-4 sm:p-5 flex justify-between items-center gap-2">
                        <div className="min-w-0">
                            <p className="text-slate-500 tracking-wider text-xs font-semibold">BOOTH INFORMATION</p>
                            <p className="font-semibold text-base sm:text-lg text-slate-900 truncate">{booth?.boothName} </p>
                        </div>
                        <div className="flex items-center bg-gray-200 py-1.5 px-3 rounded-lg shrink-0 gap-1">
                            <Pencil className="h-3.5 w-3.5 text-slate-600"/>
                            <span className="text-xs font-medium px-2.5 py-1">Editing booth</span>
                        </div>
                    </div>
 
                    <div className="w-full border-t-1 border-gray-400 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gray-200">
                        <div>
                            <p className="text-slate-500 font-medium tracking-wider text-xs">Booth number</p>
                            <p className="font-semibold text-xs sm:text-sm text-slate-800">{booth?.boothId}</p>
                        </div>

                        <div>
                        <p className="text-slate-500 font-medium tracking-wider text-xs">Creation date</p>
                        <p className="font-semibold text-xs sm:text-sm text-slate-800">{formatDate(booth.creationDate)}</p>
                        </div>

                        <div>
                            <p className="text-slate-500 font-bold tracking-wider text-xs">Immutable Data</p>
                            <p className="text-slate-500 tracking-wider text-xs">These details can't be changed.</p>
                        </div>
                    </div>

                     <form className="flex flex-col gap-4"
                     onSubmit={handleSubmit}>
                        <div className="border-t-1 border-gray-400 p-4 flex flex-col gap-3 w-full">
                            <div>
                                <p className="text-base sm:text-lg font-bold text-slate-900">Booth details</p>
                                <p className="text-slate-500 text-xs">Update the name and venue used to identify this booth.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="flex flex-col">
                                    <p className="text-xs sm:text-sm font-medium text-slate-700 mb-1">Booth name</p>
                                    <input
                                    type="text"
                                    value={editBooth.boothName}
                                    name="boothName"
                                    onChange={handleChange}
                                    placeholder="Enter new booth name"
                                    className="p-2 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-slate-700 mb-1">Location</p>
                                    <input
                                    type="text"
                                    value={editBooth.boothLocation}
                                    name="boothLocation"
                                    onChange={handleChange}
                                    placeholder="Enter new booth location"
                                    className="p-2 rounded-lg border border-gray-400 w-full focus:outline focus:ring-2 focus:ring-blue-500 text-sm text-slate-800"
                                    />
                                </div>
                            </div>
                                
                            <hr className="border-slate-400"/>

                            <div>
                                <p className="text-base sm:text-lg font-bold text-slate-900">Configuration</p>
                                <p className="text-slate-500 text-xs">Manage the booth's installation type and status.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                    <label className="text-xs sm:text-sm font-medium text-slate-700 mb-1">Booth type</label>
                                        <select
                                        className="border p-2 rounded-lg border-gray-400 text-sm text-slate-800"
                                        value={editBooth.boothType}
                                        onChange={handleChange}
                                        name="boothType">
                                            <option value="PERMANENT">Permanent</option>
                                                <option value="POP_UP">Pop-Up</option>
                                        </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs sm:text-sm font-medium text-slate-700 mb-1">Booth Status</label>
                                    <select 
                                    className="border p-2 rounded-lg border-gray-400 text-sm text-slate-800"
                                    value={editBooth.boothStatus}
                                    onChange={handleChange}
                                    name="boothStatus">
                                        <option value="ONLINE">Online</option>
                                        <option value="MAINTENANCE">Maintenance</option>
                                        <option value="OFFLINE">Offline</option>
                                    </select>
                                </div>
                            </div>
                        
                        </div>

                        <div className="border-t-1 border-gray-400 p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                            {!error && (
                                <p className="text-slate-500 text-xs">Changes apply only after saving.</p>
                                )}
                            {error && (
                                <div className="p-3 bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg border border-rose-200"> 
                                {error}
                                </div>
                            )}
                            <div className="flex  gap-2">
                                <button className="border p-2 px-4 rounded-lg border-gray-400 text-sm font-medium cursor-pointer" onClick={onClose}>Cancel</button>
                                <button className="border p-2 px-4 rounded-lg bg-black text-white cursor-pointer" type="submit" disabled={loading}
                                >{loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span className="text-sm font-medium">{loading ? "Saving..." : "Save Changes"}</span></button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}