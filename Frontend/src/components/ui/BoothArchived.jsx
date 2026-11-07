import { Link } from "react-router-dom"
import { ArrowLeft, Type } from "lucide-react"
import { useState, useEffect } from "react";
import { boothService } from "../../services/boothService";
import TypeCard from "./TypeCard";


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
    const [archivedBooth, setArchivedBooth] = useState([]);
    const [error, setError] = useState("");

    async function archivedSummaryFunction() {
        try {
            setSummary(await boothService.getArchiveSummary());
        } catch(error) {
            setError(error.message || "Failed to Fetch Archived Summary")
        }
    }



    useEffect(() => {
        archivedSummaryFunction();
    }, []);

    async function archivedBoothFunction() {
        try{
            const data = await boothService.getAllDeletedBooths(0, 5);
            setArchivedBooth(data.content || []);
            
        } catch(error) {
            setError(error.message || "Failed to fetch archived booths")
        }
    }

    useEffect(() => {
        archivedBoothFunction();
    }, [])

    return(
        <>
        <div className="p-4">
            {/* First Row Div, Header */}
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-semibold">Archived Booths</h1>
                    <p className="text-slate-500 text-xs sm:text-sm">Review archived photo booths and restore them to your active fleet</p>
                </div>

                <Link to="/booth-fleet-management" className="flex items-center gap-2 border p-2 rounded bg-black text-white">
                    <ArrowLeft className="w-4 h-4"/>
                    <span>Active Booths</span>
                </Link>
            </div>

            {/* Second Row Div */}
            <div>
                <div className="p-4 border w-56 rounded-lg border-gray-400">
                    <h2 className="font-bold text-xl">Archive summary</h2>
                    <p className="text-slate-500 text-xs mb-4">Last Archived: {formatDate(summary?.lastArchivedAt)}</p>
                
                    <div>
                        <TypeCard archivedSummary={summary} boothArchived={archivedBooth} error={error}/>       
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}