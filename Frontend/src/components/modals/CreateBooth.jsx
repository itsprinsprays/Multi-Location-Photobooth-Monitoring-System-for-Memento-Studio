import { SquareX, Info } from "lucide-react";
import { useState } from "react";

export default function CreateBooth({onClose}) {

    const [booth, setBooth] = useState({
        boothName: "",
        boothLocation: "",
        boothType: "",
        boothStatus: "OFFLINE",
    });

    function handleChange(e) {
        e.preventDefault();
        setBooth({
            ...booth,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl h-150 w-190 overflow-y-auto shadow-lg">

                {/* Header */}
                <div className="flex flex-row justify-between mb-2 bg-gray-100 py-4 px-6 border-b border-gray-300">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-[25px] font-bold mb-2">Add New Booth</h1>
                        <p className="text-gray-500 text-sm">Enter the details to add a photobooth to your fleet</p>
                    </div>
                    <SquareX className="text-gray-400 hover:text-gray-700 cursor-pointer" onClick={onClose} />
                </div>

                <div className="flex flex-col py-4 px-6">
                    <form>
                        <p>Booth Name</p>
                        <input
                        type="text"
                        placeholder="e.g. Memento Southmall"
                        name="boothName"
                        value={booth.boothName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <p>Booth Location</p>
                        <input
                        type="text"
                        placeholder="e.g. SM Southmall, Las Pinas"
                        name="boothLocation"
                        value={booth.boothLocation}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex flex-col justify-between border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full bg-gray-50">
                            <div className="flex flex-row items-center gap-2 mb-2">
                                <Info className="text-blue-300" />
                                <span className="font-semibold text-sm">Booth ID and creation date are automatically generated</span>
                            </div>
                            <p className="text-gray-500 text-xs pl-8">Both will be generated when you add this booth</p>
                        </div>


                        <div className="">
                            <p className="text-gray-500 text-sm font-semibold">BOOTH TYPE</p>
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

                        <div>
                            <p>Initial Status</p>
                            <div className="flex flex-row items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full bg-gray-50">
                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                <p>Offline</p>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
        </>
    )
}