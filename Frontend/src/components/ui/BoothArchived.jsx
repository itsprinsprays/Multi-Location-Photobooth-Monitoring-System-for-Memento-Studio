import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react";
import { boothService } from "../../services/boothService";

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
                <div className="p-4 border">
                    <h2>Archive summary</h2>
                    <p>{formatDate(summary?.lastArchivedAt)}</p>

                    <div>
                       
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}