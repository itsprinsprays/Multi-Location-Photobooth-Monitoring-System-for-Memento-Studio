import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { boothService } from "../services/boothService";
import StatusCard from "../components/ui/StatusCard.jsx"

export default function BoothManagement() {

    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    const statusBreakdown = [
    { label: "TOTAL BOOTHS", count: summary?.totalBooths ?? 0, color: "bg-violet-500" },
    { label: "ONLINE", count: summary?.onlineBooths ?? 0, color: "bg-emerald-500" },
    { label: "MAINTENANCE", count: summary?.maintenanceBooths ?? 0, color: "bg-amber-500" },
    { label: "OFFLINE", count: summary?.offlineBooths ?? 0, color: "bg-rose-500" },
    ];

    useEffect(() => {
        async function loadData() {
            try {
                const summaryData = await boothService.getSummary();
                setSummary(summaryData);
            } catch(error) {
                setError(error.message || "Failed to load data")
            }
        }
        loadData();
    }, []);


  return (
    <>
    <div className="py-4 px-6">
        {/*Header */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
            <h1 className="font-bold text-3xl">Booth Fleet Management</h1>
            <p className="text-gray-500">Monitor, configure, and manage active photo booths accorss all venues</p>
            </div>
            <button type="submit" className="flex flex-row bg-black p-2 px-4 rounded text-white cursor-pointer transitions-color duration-300 hover:bg-[#3e3a41]">
                <Plus />
                <span>Create Booth</span>
            </button>
        </div>
        
        <div className="flex flex-row justify-between">
            <div className="w-[28%] h-44 border-2 border-slate-300 p-4 rounded-2xl">
                <p className="text-gray-500 font-semibold text-xs">FLEET SUMMARY</p>
                <p className="text-gray-500 text-xs">Active booths are grouped by status and type for faster inventory review</p>

                <div className="flex flex-row">
                    <div className="p-4 w-full">
                        <p className="text-3xl font-bold">{summary?.totalBooths ?? 0}</p>
                        <p className="text-xs">TOTAL BOOTHS</p>
                    </div>

                    <div className="p-4 w-full">
                        <p className="text-3xl font-bold">{summary?.onlineBooths ?? 0}</p>
                        <p className="text-xs">ONLINE NOW</p>
                    </div>
                </div>
            </div>

            <div className="w-[70%] h-44 border-2 border-slate-300 rounded-2xl px-4 py-2 ">
                <p className="font-bold text-lg ">Status Breakdown</p>
        
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

    </div>
    </>
  )
}