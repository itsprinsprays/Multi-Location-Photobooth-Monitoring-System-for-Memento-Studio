import { Link } from "react-router-dom"
import { ArrowLeft, Search, Info, RotateCcw, CheckCircle2 } from "lucide-react"
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

    // Modal & feedback state
    const [boothToRestore, setBoothToRestore] = useState(null);
    const [restoring, setRestoring] = useState(false);
    const [restoreError, setRestoreError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    function handleOpenRestoreModal(booth) {
        setRestoreError("");
        setBoothToRestore(booth);
    }

    async function handleConfirmRestore() {
        if (!boothToRestore) return;
        try {
            setRestoring(true);
            setRestoreError("");
            await boothService.restoreBooth(boothToRestore.boothId);
            const restoredName = boothToRestore.boothName;
            setBoothToRestore(null);
            setSuccessMessage(`"${restoredName}" has been restored to your active fleet.`);
            setTimeout(() => setSuccessMessage(""), 5000);
            archivedSummaryFunction();
            archivedBoothFunction();
        } catch(error) {
            setRestoreError(error.message || "Restore failed");
        } finally {
            setRestoring(false);
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

                <Link to="/booth-fleet-management" className="flex items-center gap-2 border p-2 rounded bg-black text-white hover:bg-slate-800 transition">
                    <ArrowLeft className="w-4 h-4"/>
                    <span>Active Booths</span>
                </Link>
            </div>

            {/* Success Message Banner */}
            {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center justify-between text-sm transition">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setSuccessMessage("")} 
                        className="text-emerald-700 hover:text-emerald-900 font-bold text-xs ml-4 cursor-pointer">
                        ✕
                    </button>
                </div>
            )}

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
                            <ArchivedBoothCard 
                                key={item.boothId} 
                                onLoad={item} 
                                onRestore={handleOpenRestoreModal}
                            />
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

        {/* Restore Confirmation Modal */}
        {boothToRestore && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                        <RotateCcw className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-center mt-4 text-slate-800">Restore Photobooth</h1>
                    <div className="mt-2 text-center text-slate-600 text-sm">
                        <p>Are you sure you want to restore this photobooth?</p>
                        <p className="text-xs text-slate-400 mt-1">This will return the booth to your active fleet and make it available for operations.</p>
                    </div>

                    <div className="flex flex-row p-3 bg-gray-100 rounded-lg mt-4 gap-4 text-sm">
                        <div className="flex flex-col gap-2 text-slate-500 font-semibold text-xs">
                            <p>BOOTH ID</p>
                            <p>NAME</p>
                            <p>TYPE</p>
                            <p>LOCATION</p>
                        </div>

                        <div className="flex flex-col gap-2 text-xs truncate">
                            <p className="font-bold text-slate-800">{boothToRestore.boothId}</p>
                            <p className="font-bold text-slate-800 truncate">{boothToRestore.boothName}</p>
                            <p className="font-bold text-slate-800">{boothToRestore.boothType}</p>
                            <p className="font-bold text-slate-800 truncate">{boothToRestore.boothLocation || "No Location"}</p>
                        </div>
                    </div>

                    {restoreError && (
                        <p className="text-red-500 text-xs text-center mt-2">{restoreError}</p>
                    )}

                    <div className="flex gap-2 mt-5">
                        <button 
                            type="button" 
                            disabled={restoring}
                            className="border p-2 w-full rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold text-slate-700 cursor-pointer disabled:opacity-50 transition"
                            onClick={() => {
                                setBoothToRestore(null);
                                setRestoreError("");
                            }}>
                            Cancel
                        </button>

                        <button 
                            type="button" 
                            disabled={restoring}
                            className="border p-2 w-full rounded-xl bg-black hover:bg-slate-800 text-white font-semibold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition"
                            onClick={handleConfirmRestore}>
                            {restoring ? (
                                <>
                                    <RotateCcw className="w-4 h-4 animate-spin" />
                                    <span>Restoring...</span>
                                </>
                            ) : (
                                <span>Restore Booth</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
