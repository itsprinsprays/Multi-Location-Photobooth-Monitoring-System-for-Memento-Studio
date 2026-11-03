import { SquareX, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { boothService } from "../../services/boothService";


export default function CreateBooth({onClose, onBoothCreated}) {

    const [booth, setBooth] = useState({
        boothId: "",
        boothName: "",
        boothLocation: "",
        boothType: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isPopUp = booth.boothType === "POP_UP";

  function handleChange(e) {
    setBooth({
        ...booth,
        [e.target.name]: e.target.value
    });
}

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if(!booth.boothId.trim()) {
            setError("Booth ID is required");
            return;
        }


        if(!booth.boothName.trim()) {
            setError("Booth Name is required");
            return;
        }


        if(!booth.boothType.trim()) {
            setError("Please select a booth type");
            return;
        }

        try {
            setLoading(true);
            await boothService.createBooth(booth);
            
            if(onBoothCreated) onBoothCreated(); // Call the callback function if provided
            onClose(); // Close the modal after successful creation
        } catch(err) {
            setError(err.message || "An error occurred while creating the booth");
        } finally {
            setLoading(false);
        }

    }

    return(
        <>
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center py-5 px-2">
            <div className="bg-white rounded-2xl w-full max-w-xl overflow-y-auto shadow-lg">

                {/* Header */}
                <div className="flex flex-row justify-between bg-gray-100 py-4 px-6 border-b border-gray-300 ">
                    <div className="flex flex-col">
                        <h1 className="text-[25px] font-bold mb-2">Add New Booth</h1>
                        <p className="text-gray-500 text-sm">Enter the details to add a photobooth to your fleet</p>
                    </div>
                    <SquareX className="text-gray-400 hover:text-gray-700 cursor-pointer" onClick={onClose} />
                </div>

                <div className="flex flex-col">
                 
                    <form onSubmit={handleSubmit} >
                        <div className="flex flex-col py-4 px-6">
                        
                            {error && (
                                <div className="p-3 bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg border border-rose-200"> 
                                {error}
                                </div>
                            )}

                            <p>Booth ID</p>
                            <input
                            type="text"
                            placeholder="e.g. BoothId - 001"
                            name="boothId"
                            value={booth.boothId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <p>Booth Name</p>
                            <input
                            type="text"
                            placeholder="e.g. Memento Southmall"
                            name="boothName"
                            value={booth.boothName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />


                            <div className="">
                                <p className="text-gray-500 text-sm font-semibold">Booth Type</p>
                                <select
                                    name="boothType"
                                    value={booth.boothType}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a type</option>
                                    <option value="PERMANENT">Permanent</option>
                                    <option value="POP_UP">Pop-Up</option>
                                </select>
                            </div>

                                <p>Booth Location</p>
                                    <input
                                        type="text"
                                        placeholder="e.g. SM Southmall, Las Pinas"
                                        name="boothLocation"
                                        value={isPopUp ? "Event Pop-Up (Flexible)" : booth.boothLocation}
                                        onChange={handleChange}
                                        disabled={isPopUp}
                                        className={`border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isPopUp ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                                        }`}
                                    />

                            <div className="flex flex-col justify-between border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full bg-gray-50">
                                <div className="flex flex-row items-center gap-2 mb-2">
                                    <Info className="text-blue-300" />
                                    <span className="font-semibold text-sm">Initial Status and creation date are automatically generated</span>
                                </div>
                                <p className="text-gray-500 text-xs pl-8">Both will be generated when you add this booth</p>
                            </div>

                        
                            </div>

                            <div className="flex flex-row justify-end gap-2 border-t border-gray-300 py-4 px-6 bg-gray-200 ">
                                    <button className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400" onClick={onClose} disabled={loading}>Cancel</button>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" type="submit" disabled={loading}>
                                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>{loading ? "Adding..." : "Add Booth"}</span>
                                    </button>
                            </div>
                
                    </form>   
              
                </div>         
            </div>
        </div>
        </>
    )
}