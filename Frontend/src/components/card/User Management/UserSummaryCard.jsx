


export default function UserSummaryCard({label, count, bgColor, description}) {
    return(
        <>
            <div>
                <div className={`${bgColor} p-4 rounded-2xl`}>
                    <p className="text-xs tracking-wider">{label}</p>
                    <p className="text-lg font-bold">{count}</p>
                    <p className="text-slate-500 text-xs">{description}</p>
                </div>
            </div>
        </>
    )
}