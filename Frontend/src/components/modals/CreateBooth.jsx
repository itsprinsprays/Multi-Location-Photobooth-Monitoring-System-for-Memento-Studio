import { SquareX } from "lucide-react";


export default function CreateBooth({onClose}) {
    return(
        <>
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg h-150 w-190">

                {/* Header */}
                <div className="flex flex-row justify-between mb-4 bg-gray-100 py-4 px-6 rounded-lg">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-[25px] font-bold mb-2">Add New Booth</h1>
                        <p className="text-gray-500 text-sm">Enter the details to add a photobooth to your fleet</p>
                    </div>
                    <SquareX className="text-gray-400 hover:text-gray-700 cursor-pointer" onClick={onClose} />
                </div>

            </div>
        </div>
        </>
    )
}