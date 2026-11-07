import { RotateCcw } from "lucide-react";
import { useState } from "react";
function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const typeBadges = {
  PERMANENT: "text-blue-700 ",
  POP_UP: "text-orange-700 ",
};



export default function ArchivedBoothCard({onLoad, onRestore}) {

    const [loading, setLoading] = useState(false);

    async function handleRestoreClick() {
        try {
            setLoading(true);
            await onRestore(onLoad.boothId);
        } finally {
            setLoading(false);
        }
    }


    return(
        <>
        <div className="p-4 border border-orange-400 rounded-lg bg-orange-50 flex flex-col gap-2">

            <div className="flex justify-between">
                <p className="text-slate-500 font-bold text-sm">{onLoad?.boothId}</p>
                <p className={`${typeBadges[onLoad?.boothType]}"}`}>{onLoad?.boothType}</p>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold tracking-wider">{onLoad?.boothName}</p>
                    <p className="text-slate-500 text-sm">{onLoad?.boothLocation || "No Location"}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-[red] rounded-full"></span>
                    <p className="text-red-500 font-bold">Archived</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p>{formatDate(onLoad?.archivedAt)}</p>

                <div className="flex gap-2">
                    <button className="border rounded-lg py-1 px-3 bg-black text-white">View</button>

                    <button className="border rounded-lg py-1 px-2 bg-white border-gray-400 flex items-center gap-2 cursor-pointer"
                    onClick={handleRestoreClick}>
                          <RotateCcw className={`h-3.5 w-3.5 text-slate-600 ${loading ? "animate-spin" : ""}`} />
                        <span>{loading ? "Restoring..." : "Restore"}</span>
                        </button>
                </div>
            </div>
        </div>
        </>
    )
}