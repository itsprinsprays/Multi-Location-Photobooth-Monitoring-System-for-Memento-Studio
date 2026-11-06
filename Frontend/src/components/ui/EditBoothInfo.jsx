import { ArrowLeft, Pencil } from "lucide-react"
import { useState } from "react";

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EditBoothInfo({onClose, booth}) {

    const [editBooth, setEditBooth] = useState({
        boothName: booth?.boothName || "No Booth Name",
        boothLocation: booth?.boothLocation || "",
        boothType: booth?.boothType || "PERMANENT",
    })

    const [selected, setSelected] = useState("");

    function handleChange(e) {
        setEditBooth({
            ...editBooth,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
            <div className="p-4 flex flex-col gap-3">

                {/* First Row Div*/}
                <div className="flex items-center text-slate-500 gap-2 cursor-pointer" onClick={onClose}>
                    <ArrowLeft className="text-xs"/>
                    <h1 className="font-semibold">Back to Booth Management</h1>
                </div>

                {/*Second Row Div */}
                <div>
                    <h1 className="text-2xl sm:text-3xl  lg:text-4xl font-bold">Update Booth Info</h1>
                    <p className="text-slate-500">Edit the booth's details and configuration. Save your chnages when you're done</p>
                </div>

                {/* Third Row Div */}
                <div className="w-full border border-gray-400 rounded-lg ">
                    <div className="w-full p-5 flex justify-between">
                        <div>
                            <p className="text-slate-500 tracking-wider text-xs font-semibold">BOOTH INFORMATION</p>
                            <p className="font-semibold text-lg">{booth?.boothName} </p>
                        </div>
                        <div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg">
                            <Pencil className="h-4 w-4"/>
                            <span>Editing booth</span>
                        </div>
                    </div>

                    <div className="w-full border-t-1 border-gray-400 p-4 flex justify-between items-center bg-gray-200">
                        <div>
                            <p className="text-slate-500 font-medium tracking-wider text-xs">Booth number</p>
                            <p className="font-semibold">{booth?.boothId}</p>
                        </div>

                        <div>
                        <p className="text-slate-500 font-medium tracking-wider text-xs">Creation date</p>
                        <p className="font-semibold">{formatDate(booth.creationDate)}</p>
                        </div>

                        <div>
                            <p className="text-slate-500 font-bold tracking-wider text-xs">Automatically generated</p>
                            <p className="text-slate-500 tracking-wider text-xs">These details can't be changed.</p>
                        </div>
                    </div>

                     <form className="flex flex-col gap-4">
                        <div className="border-t-1 border-gray-400 p-4 flex flex-col gap-3 w-full">
                            <div>
                                <p className="font-semibold text-lg">Booth details</p>
                                <p className="text-slate-500 text-xs">Update the name and venue used to identify this booth.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="flex flex-col">
                                    <p className="font-semibold">Booth name</p>
                                    <input
                                    type="text"
                                    value={editBooth.boothName}
                                    name="boothName"
                                    onChange={handleChange}
                                    placeholder="Enter new booth name"
                                    className="p-2 rounded-lg border border-gray-400 w-full"
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold">Location</p>
                                    <input
                                    type="text"
                                    value={editBooth.boothLocation}
                                    name="boothLocation"
                                    onChange={handleChange}
                                    placeholder="Enter new booth location"
                                    className="p-2 rounded-lg border border-gray-400 w-full"
                                    />
                                </div>
                            </div>
                                
                            <hr className="border-slate-400"/>

                            <div>
                                <p className="font-semibold text-lg">Configuration</p>
                                <p className="text-slate-500 text-xs">Manage the booth's installation type.</p>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold">Booth type</label>
                                    <select
                                    className="border p-2 rounded-lg border-gray-400"
                                    value={editBooth.boothType}
                                    onChange={handleChange}
                                    name="boothType">
                                        <option value="PERMANENT">Permanent</option>
                                            <option value="POP_UP">Pop-Up</option>
                                    </select>
                            </div>
                        
                        </div>

                        <div className="border-t-1 border-gray-400 p-4 flex flex-row items-center justify-between">
                            <p className="text-slate-500 text-xs">Changes apply only after saving</p>
                            <div className="flex gap-2">
                                <button className="border p-2 px-4 rounded-lg border-gray-400">Cancel</button>
                                <button className="border p-2 px-4 rounded-lg bg-black text-white">Save Changes</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}