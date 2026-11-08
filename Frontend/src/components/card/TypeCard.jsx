export default function TypeCard({ archivedSummary, boothArchived = [], error }) {

    // 1. Safe math (defaults to 0 while loading)
    const total = (archivedSummary?.popUpArchived ?? 0) + (archivedSummary?.permanentArchived ?? 0);
    const popUpCount = archivedSummary?.popUpArchived ?? 0;
    const permanentCount = archivedSummary?.permanentArchived ?? 0

    // Filter pop-up booths only (if needed)
    const popUpBooths = boothArchived?.filter((booth) => booth?.boothType === "POP_UP");
    const permanentBooths = boothArchived?.filter((booth) => booth?.boothType === "PERMANENT"); 

    return (
        <div className="flex flex-col gap-4 w-full">
            
            {error && (
                <div className="p-3 bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg border border-rose-200">
                    {error}
                </div>
            )}

            {/* Total Archived Card */}
            <div className="p-4 border rounded-xl border-slate-300 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
                    <p className="text-xs tracking-wider text-slate-500 font-bold uppercase">ARCHIVED BOOTHS</p>
                </div>
                <p className="text-4xl font-extrabold text-slate-900 py-2">{total}</p>
                <p className="text-xs text-slate-500">
                    {popUpCount} pop-up and {archivedSummary?.permanentArchived ?? 0} permanent booths are currently archived
                </p>
            </div>

            {/* Pop-up Booths List Card */}
            <div className="p-4 border rounded-xl border-slate-300 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                        <p className="text-xs tracking-wider text-slate-500 font-bold uppercase">POP-UP BOOTHS</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        {popUpBooths.length > 0 ? popUpCount : "0"}
                    </span>
                </div>

                <div className="mt-3 flex flex-col gap-2 divide-y divide-slate-100">
                    {/* Safe mapping with automatic return */}
                    {popUpBooths && popUpBooths.length > 0 ? (
                        popUpBooths.map((item) => (
                            <div key={item?.boothId} className="pt-2 flex justify-between items-center text-sm">
                                <span className="font-medium text-slate-800">{item?.boothName}</span>
                                <span className="text-xs text-slate-400">{item?.boothId}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-slate-400 pt-2">No archived pop-up booths</p>
                    )}
                </div>
            </div>

            <div className="p-4 border rounded-xl border-slate-300 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                            <p className="text-xs tracking-wider text-slate-500 font-bold uppercase">PERMANENT BOOTHS</p>
                        </div>
                        <span className="text-xs font-semibold h-4 w-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                            {permanentBooths.length > 0 ? permanentCount : "0"}
                        </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 divide-y divide-slate-100">
                    {permanentBooths && permanentBooths.length > 0 ? (
                        permanentBooths.map((item) => (
                            <div key={item?.boothId} className="pt-2 flex justify-between items-center text-sm">
                                <span className="font-medium text-slate-800">{item?.boothName}</span>
                                <span className="text-xs text-slate-400">{item?.boothId}</span>
                                
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-slate-400 pt-2">No archived permanent booths</p>
                    )}
            </div>
        </div>


        </div>
    );
}