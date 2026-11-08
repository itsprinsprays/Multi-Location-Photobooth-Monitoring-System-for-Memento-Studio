import { RotateCcw } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const typeBadges = {
  PERMANENT: "text-blue-700 text-xs font-semibold",
  POP_UP: "text-orange-700 text-xs font-semibold",
};

export default function ArchivedBoothCard({ onLoad, onRestore }) {
    return(
        <>
        <div className="p-4 border border-orange-300 rounded-lg bg-orange-50 flex flex-col gap-2">

            <div className="flex justify-between">
                <p className="text-slate-500 font-semibold text-xs">{onLoad?.boothId}</p>
                <p className={typeBadges[onLoad?.boothType]}>{onLoad?.boothType}</p>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm sm:text-lg font-bold tracking-wider">{onLoad?.boothName}</p>
                    <p className="text-xs sm:text-base text-slate-500">{onLoad?.boothLocation || "No Location"}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-[red] rounded-full"></span>
                    <p className="text-red-500 font-bold text-xs sm:text-base">Archived</p>
                </div>
            </div>

             <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-xs sm:text-sm text-slate-500">{formatDate(onLoad?.archivedAt)}</p>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-2 w-full">
                    <button className="border rounded-lg py-1 px-3 bg-black text-white cursor-pointer hover:bg-slate-800 transition">View</button>

                    <button 
                        className="border rounded-lg py-1 px-2 bg-white border-gray-400 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition flex justify-center items-center"
                        onClick={() => onRestore(onLoad)}>
                        <RotateCcw className="h-3.5 w-3.5 text-slate-600" />
                        <span>Restore</span>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}
