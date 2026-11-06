import { Plus, Search, Trash2, SquarePen, ArchiveX } from "lucide-react";
import { useState, useEffect } from "react";
import { boothService } from "../services/boothService";
import StatusCard from "../components/ui/StatusCard.jsx"
import CreateBooth from "../components/modals/CreateBooth.jsx";
import EditBoothInfo from "../components/ui/EditBoothInfo.jsx";

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const typeBadges = {
  PERMANENT: "bg-blue-100 text-blue-700 border border-blue-200 py-1 px-2 rounded-2xl",
  POP_UP: "bg-orange-100 text-orange-700 border border-orange-200 py-1 px-2 rounded-2xl",
};

const statusBadges = {
    ONLINE: "bg-emerald-100 text-emerald-700 border border-emerald-200 py-1 px-2 rounded-2xl",
    OFFLINE: "bg-rose-100 text-rose-700 border border-rose-200 py-1 px-2 rounded-2xl",
    MAINTENANCE: "bg-amber-100 text-amber-700 border border-amber-200 py-1 px-2 rounded-2xl",
}

export default function BoothManagement() {

    const [selectedType, setSelectedType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [summary, setSummary] = useState(null);
    const [booths, setBooths] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Current page (0-indexed)
    const [totalPages, setTotalPages] = useState(1);  

    const [createBooth, setCreateBooth] = useState(false);
    const [boothDelete, setBoothDelete] = useState(false);
    const [editBooth, setEditBooth] = useState(false);


    const statusBreakdown = [
    { label: "TOTAL BOOTHS", count: summary?.totalBooths ?? 0, color: "bg-violet-500" },
    { label: "ONLINE", count: summary?.onlineBooths ?? 0, color: "bg-emerald-500" },
    { label: "MAINTENANCE", count: summary?.maintenanceBooths ?? 0, color: "bg-amber-500" },
    { label: "OFFLINE", count: summary?.offlineBooths ?? 0, color: "bg-rose-500" },
    ];



    // Calculate Fleet Health percentage & dynamic badge
    const total = summary?.totalBooths || 0;
    const online = summary?.onlineBooths || 0;
    const healthRate = total > 0 ? Math.round((online / total) * 100) : 0;

    const healthBadge = 
    healthRate >= 80 
        ? { text: "OPTIMAL", color: "bg-emerald-100 text-emerald-700", barColor: "bg-emerald-500" }
        : healthRate >= 50 
        ? { text: "ATTENTION", color: "bg-amber-100 text-amber-700", barColor: "bg-amber-500" }
        : { text: "CRITICAL", color: "bg-rose-100 text-rose-700", barColor: "bg-rose-500" };

    async function deleteBooth(boothId) {
        try{
            await boothService.deleteBooth(boothId);
            loadBooths();
            fetchSummary();
            setBoothDelete(false);
        } catch (error) {
             setError(error.message || "Failed to delete booth");
        }
    }

    async function fetchSummary() {
        try {
            setSummary(await boothService.getSummary());
        } catch (error) {
            setError(error.message || "Failed to fetch booth summary");
        }
    }

    useEffect(() => {
        fetchSummary();
    }, []);

    async function loadBooths() {
        try {
            const statusParam = selectedStatus ? selectedStatus.toUpperCase() : null;
            const typeParam = selectedType ? selectedType.toUpperCase() : null;
            const data = await boothService.getAllBooths(currentPage, 5, statusParam, typeParam);
            setBooths(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            setError(error.message || "Failed to fetch booths");
        }
    }


    useEffect(() => {
        loadBooths();
    }, [selectedStatus, selectedType, currentPage]);

    function onBoothLoad() {
        loadBooths();
        fetchSummary();
    }


  return (
    <>
    <div className="px-6">
        {!editBooth && (
            <>
            {/* First Row Div , Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div className="flex flex-col">
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight ">Booth Fleet Management</h1>
                <p className="text-slate-500 text-sm sm:text-base mt-1">Monitor, configure, and manage active photo booths accorss all venues</p>
                </div>
                <button type="submit" className="w-full sm:w-40 flex flex-row justify-center items-center bg-black p-2 px-4 rounded text-white cursor-pointer transitions-color duration-300 hover:bg-[#3e3a41]"
                onClick={() => setCreateBooth(true)}>
                    <Plus className="w-5 h-5" />
                    <span className="font-medium text-sm">Create Booth</span>
                </button>
            </div>
            
            {/* Second Row Div */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Fleet Health */}
                <div className="w-full lg:w-[32%] border-2 border-slate-300 p-4 rounded-2xl flex flex-col justify-between bg-white min-h-[170px]">
                    <div>
                        {/* Header + Dynamic Status Badge */}
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 font-semibold text-xs sm:text-base tracking-wider">FLEET HEALTH</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${healthBadge.color}`}>
                                {healthBadge.text}
                            </span>
                        </div>

                        {/* Big Percentage + Progress Bar */}
                        <div className="mt-2">
                            <p className="text-3xl font-extrabold text-slate-900">{healthRate}%</p>
                            <p className="text-xs text-slate-400">Operational Uptime</p>
                            
                            {/* Animated Uptime Bar */}
                            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${healthBadge.barColor}`} 
                                    style={{ width: `${healthRate}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer summary */}
                    <p className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-800">{online}</span> of <span className="font-semibold text-slate-800">{total}</span> units active right now
                    </p>
                </div>

                {/* Status Breakdown */}
                <div className="w-full border-2 border-slate-300 rounded-2xl px-4 py-2 ">
                    <p className="font-bold text-base sm:text-lg ">Status Breakdown</p>
                
                    <div className="grid grid-cols-2 gap-2">
                        {statusBreakdown.map((item) => (
                        <StatusCard 
                            key={item.label}
                            label={item.label}
                            count={item.count}
                            color={item.color}
                                />
                            ))}
                    </div>
                </div>
            </div>
            
            {/* Third Row Div */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-4">
                <div className="flex flex-col sm:flex-row w-full gap-4 items-stretch">
                    <div className="flex flex-row items-center border-2 border-slate-300 rounded-md p-2 bg-white w-full sm:w-auto">
                        <Search className="text-slate-400" />
                        <input
                        type="text"
                        placeholder="Search booth Id, name or location..."
                        className="ml-2  outline-none w-full sm:flex-1"
                        />
                    </div>

                    <div className="flex gap-2 justify-between w-full sm:w-auto">
                        <div className="flex-1">
                            <select
                            id="boothType"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="border border-slate-300 rounded-md p-2 bg-white w-full">
                                <option value="">All Types</option>
                                <option value="POP_UP">POP_UP</option>
                                <option value="PERMANENT">PERMANENT</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <select
                            id="boothStatus"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border border-slate-300 rounded-md p-2 bg-white w-full">
                                <option value="">All Status</option>
                                <option value="ONLINE">Online</option>
                                <option value="OFFLINE">Offline</option>
                                <option value="MAINTENANCE">Maintenance</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="w-full sm:w-auto">
                    <button className="bg-[red] text-white px-4 py-2 rounded-md flex flex-row items-center w-full flex flex-row items-center justify-center ">
                        <ArchiveX className="w-4 h-4 text-white inline-block mr-2" />
                        <span>Archived</span>
                        </button>
                </div>
            </div>
            
            {/* Fourth Row Div */}
            <div className="hidden lg:flex mt-4 border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left font-bold text-xs font-semibold">
                            <th className="p-2">BOOTH ID</th>
                            <th className="p-2">BOOTH NAME</th>
                            <th className="p-2">LOCATION</th>
                            <th className="p-2">TYPE</th>
                            <th className="p-2">STATUS</th>
                            <th className="p-2">CREATED DATE</th>
                            <th className="p-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">

                    {booths.map((booth) => (
                        <tr key = {booth.boothId} className="hover:bg-gray-100">
                            <td className="p-2 font-semibold">{booth.boothId}</td>
                            <td className="p-2">{booth.boothName}</td>
                            <td className="p-2 text-slate-500">{booth.boothLocation}</td>
                            <td className="p-2">
                                <span className = {`text-xs ${typeBadges[booth.boothType]}`}>
                                    {booth.boothType === "POP_UP" ? "POP_UP" : "PERMANENT"}
                                </span>
                            </td>
                            <td className="p-2">
                                <span className={`text-xs ${statusBadges[booth.boothStatus]}`}>
                                    {booth.boothStatus === "" ? "Unknown" : booth.boothStatus}
                                </span>
                                </td>
                            <td className="p-2 text-slate-500">{formatDate(booth.creationDate)}</td>
                            <td className="p-2 flex gap-2">
                                <button className="bg-gray-500 text-white px-2 py-1 rounded-md cursor-pointer" onClick={() => setEditBooth(booth)} >
                                    <SquarePen className="w-4 h-4 text-white"/></button>
                                <button className="bg-red-300 text-white px-2 py-1 rounded-md ml-2 cursor-pointer" onClick={() => setBoothDelete(booth)}>
                                <Trash2 className="w-4 h-4 text-[red]" /></button>
                                <button className="bg-black text-white px-4 py-1 rounded-md ml-2">View</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="lg:hidden flex flex-col gap-3 mt-4 w-full">
                {booths.map((booth) => (
                
                    <div key= {booth.boothId} >
                        <div className="flex flex-col w-full gap-4 border border-gray-300 p-4 max-w-xl rounded-xl">
                            <div className="flex justify-between">
                                <span>{booth.boothId}</span>
                                <span className={`text-xs ${statusBadges[booth.boothStatus]}`}>
                                        {booth.boothStatus === "" ? "Unknown" : booth.boothStatus}
                                    </span>
                            </div>

                            <div className="">
                                <p>{booth.boothName}</p>
                                <p className="text-slate-500">{booth.boothLocation}</p>
                            </div>

                            <div className="flex justify-between">
                                <span className = {`text-xs ${typeBadges[booth.boothType]}`}>
                                        {booth.boothType === "POP_UP" ? "POP_UP" : "PERMANENT"}
                                    </span>
                                <p className="text-slate-500 text-xs">Created {formatDate(booth.creationDate)}</p>
                            </div>
                            <hr className="text-slate-300" />

                            <div className="flex items-center">
                                <div className="flex items-center gap-2 bg-white border border-gray-300 text-black p-2 rounded-md">
                                        <SquarePen className="w-4 h-4 text-black" />
                                        <span className="text-slate-900">Edit</span>
                                </div>

                                <button className="bg-red-200 text-white p-3 rounded-md ml-2 cursor-pointer" onClick={() => setBoothDelete(booth)}>
                                <Trash2 className="w-4 h-4 text-[red]" /></button>

                                <div className="border rounded-md p-2 w-full text-center bg-black text-white ml-2">
                                    <p>View</p>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>           
            <div className="flex items-center justify-between mt-2 text-sm text-slate-500 mb-4">
                <p>
                    Page <span className="font-semibold text-slate-800">{currentPage + 1}</span> of{" "}
                    <span className="font-semibold text-slate-800">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-medium text-slate-700">
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-medium text-slate-700">
                        Next
                    </button>
                </div>
            </div>
            </>
        )}
    </div>
    
        {createBooth && <CreateBooth onClose={() => setCreateBooth(false)} onBoothCreated={onBoothLoad} />}

        {boothDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
                    <Trash2 className="w-16 h-16 rounded-full bg-[red] text-white mx-auto p-2" />
                    <h1 className="text-[30px] font-bold text-center mt-4">Delete Photobooth</h1>
                    <div className="mt-2 text-center">
                        <p>Are you sure you want to delete this photobooth?</p>
                        <p>This action cannot be undone and will remove all associated data.</p>
                    </div>

                    <div className="flex flex-row p-2 bg-gray-100 rounded-lg mt-4 gap-4">
                        <div className="flex flex-col gap-2 text-slate-500 font-semibold text-sm">
                            <p>BOOTH ID</p>
                            <p>NAME </p>
                            <p>LOCATION</p>
                        </div>

                        <div className="flex flex-col gap-2 ml-2">
                            <p className="font-bold text-sm">{boothDelete.boothId}</p>
                            <p className="font-bold text-sm">{boothDelete.boothName}</p>
                            <p className="font-bold text-sm">{boothDelete.boothLocation}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                        <button type="submit" className="border p-2 w-full rounded-xl bg-gray-100 font-semibold cursor-pointer"
                        onClick={(() => setBoothDelete(false))}>
                            Cancel</button>

                        <button type="submit" className="border p-2 w-full rounded-xl bg-red-500 text-white cursor-pointer"
                        onClick={(() => deleteBooth(boothDelete.boothId))}>
                            Delete Booth</button>
                    </div>
                </div>
                
            </div>
        )}

        {editBooth && <EditBoothInfo onClose={(() => setEditBooth(false))} booth={editBooth} onUpdateBooth={onBoothLoad}/>}
    </>
  )
}