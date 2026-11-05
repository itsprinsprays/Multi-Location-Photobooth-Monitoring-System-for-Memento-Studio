import { ArrowLeft, Pencil } from "lucide-react"

export default function EditBoothInfo({onClose, booth}) {

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
                <div className="w-full border rounded-lg ">
                    <div className="w-full p-4 flex justify-between">
                        <div>
                            <p>BOOTH INFORMATION</p>
                            <p>{booth.boothName}</p>
                        </div>
                        <div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg">
                            <Pencil className="h-4 w-4"/>
                            <span>Editing booth</span>
                        </div>
                    </div>

                    <div className="w-full border-t-1 p-4 flex justify-between">
                        <p className="text-slate-500">Booth Number</p>
                        <p className="text-slate-500">Creation date</p>

                        <div>
                            <p className="text-slate-500 font-bold">Automatically generated</p>
                            <p className="text-slate-500">These details can't be changed</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}