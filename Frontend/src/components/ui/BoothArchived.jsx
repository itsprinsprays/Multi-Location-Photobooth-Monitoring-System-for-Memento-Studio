import { Link } from "react-router-dom"
import { ArrowLeft, Search } from "lucide-react"
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
                <div className="p-4 border w-auto rounded-lg border-gray-400">
                    <h2 className="font-semibold text-xl">Archive summary</h2>
                    <p className="text-slate-500 text-xs mb-4">Last Archived: {formatDate(summary?.lastArchivedAt)}</p>
                
                    <div>
                        <TypeCard archivedSummary={summary} boothArchived={archivedBooth} error={error}/>       
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
                        <select className="border rounded-lg p-2 border-gray-400">
                            <option>All Types</option>
                            <option>Permanent</option>
                            <option>Pop-Up</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                    {archivedBooth.map((item) => (
                        <ArchivedBoothCard key={item.boothId} onLoad={item}/>
                    ))}
                    </div>
                </div>

            </div>

        
        </div>
        </>
    )
}