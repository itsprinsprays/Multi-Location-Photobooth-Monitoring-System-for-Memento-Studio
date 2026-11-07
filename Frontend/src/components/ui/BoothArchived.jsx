import { Link } from "react-router-dom"
import { ArrowLeft, Search, Info } from "lucide-react"
import { useState, useEffect } from "react";
import { boothService } from "../../services/boothService";
import TypeCard from "../card/TypeCard";
import ArchivedBoothCard from "../card/ArchivedBoothCard";


function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}



export default function BoothArchived() {

    const [summary, setSummary] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [archivedBooth, setArchivedBooth] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    async function archivedSummaryFunction() {
        try {
            setSummary(await boothService.getArchiveSummary());
        } catch(error) {
            setError(error.message || "Failed to Fetch Archived Summary")
        }
    }

    async function archivedBoothFunction() {
        try{
            const typeParam = selectedType ? selectedType.toUpperCase() : null
            const data = await boothService.getAllDeletedBooths(currentPage, 5, typeParam);
            setArchivedBooth(data.content || []);
            setTotalPages(data.totalPages || 1)
        } catch(error) {
            setError(error.message || "Failed to fetch archived booths")
        }
    }    

    async function handleRestore(boothId) {
        try {
            await boothService.restoreBooth(boothId);
            archivedSummaryFunction();
            archivedBoothFunction();
        } catch(error) {
            setError(error.message || "Restore failed")
        }
    }
    
    useEffect(() => {
        archivedSummaryFunction();
    }, []);

    useEffect(() => {
        archivedBoothFunction();
    }, [currentPage, selectedType])

    return(
        <>
        <div className="px-6 max-w-7xl mx-auto w-full">
            {/* First Row Div, Header */}
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Archived Booths</h1>
                    <p className="text-slate-500 text-xs sm:text-sm">Review archived photo booths and restore them to your active fleet</p>
                </div>

                <Link to="/booth-fleet-management" className="flex items-center gap-2 border p-2 rounded bg-black text-white">
                    <ArrowLeft className="w-4 h-4"/>
                    <span>Active Booths</span>
                </Link>
            </div>

            {/* Second Row Div */}
            <div className="flex gap-2">
                <div className="p-4 border w-auto rounded-lg border-gray-400 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl">Archive summary</h2>
                    <p className="text-slate-500 text-xs mb-4">Last Archived: {formatDate(summary?.lastArchivedAt)}</p>
                
                    <div>
                        <TypeCard archivedSummary={summary} boothArchived={archivedBooth} error={error}/>       
                    </div>

                    <div className="flex items-center gap-2 bg-orange-50 border-orange-300 border p-2 rounded-xl ">
                        <Info className="text-slate-500"/>
                        <p className="text-xs text-slate-500"> - Archived booths are excluded from your active fleet. <br />
                        - Restoring a booth keep its settings and session history.</p>
                    </div>
                </div>
                   
                <div className="p-4 border w-full rounded-lg border-gray-400 flex flex-col gap-5">
                    <div className="flex flex-row items-center border-2 border-slate-300 rounded-md p-2 bg-white w-full sm:w-auto">
                        <Search className="text-slate-400 h-4 w-4" />
                        <input
                        type="text"
                        placeholder="Search booth Id, name or location..."
                        className="ml-2  outline-none w-full sm:flex-1"
                        />
                    </div>

                    <div>
                        <select 
                        id="boothType"
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            setCurrentPage(0);
                        }}
                        
                        className="border rounded-lg p-2 border-gray-400"
                        >
                            <option value="">All Types</option>
                            <option value="POP_UP">Pop_Up</option>
                            <option value="PERMANENT">Permanent</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {archivedBooth.map((item) => (
                            <ArchivedBoothCard key={item.boothId} onLoad={item} onRestore={handleRestore}/>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-slate-500 pt-3 border-t border-slate-200">
                        <p>
                            Page <span className="font-semibold text-slate-800">{currentPage + 1}</span> of{" "}
                            <span className="font-semibold text-slate-800">{totalPages}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-medium text-slate-700 cursor-pointer" >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage >= totalPages - 1}
                                className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-medium text-slate-700 cursor-pointer">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        
        </div>
        </>
    )
}