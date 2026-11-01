import { Plus, Search } from "lucide-react";
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

    useEffect(() => {
        async function loadData() {
            try {
                setSummary(await boothService.getSummary());
            } catch(error) {
                setError(error.message || "Failed to load data")
            }
        }
        loadData();
    }, []);


  return (
    <>
    <div className="py-4 px-6">
        {/* First Row Div , Header */}
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
        
        {/* Second Row Div */}
        <div className="flex flex-row justify-between gap-2">
             {/* Fleet Health */}
            <div className="w-[30%] h-46 border-2 border-slate-300 p-4 rounded-2xl flex flex-col justify-between bg-white">
                <div>
                    {/* Header + Dynamic Status Badge */}
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 font-semibold text-xs tracking-wider">FLEET HEALTH</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${healthBadge.color}`}>
                            {healthBadge.text}
                        </span>
                    </div>

                    {/* Big Percentage + Progress Bar */}
                    <div className="mt-2">
                        <p className="text-3xl font-extrabold text-slate-900">{healthRate}%</p>
                        <p className="text-xs text-gray-400">Operational Uptime</p>
                        
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
                <p className="text-[11px] text-gray-500">
                    <span className="font-semibold text-slate-800">{online}</span> of <span className="font-semibold text-slate-800">{total}</span> units active right now
                </p>
            </div>

            {/* Status Breakdown */}
            <div className="w-[70%] h-46 border-2 border-slate-300 rounded-2xl px-4 py-2 ">
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