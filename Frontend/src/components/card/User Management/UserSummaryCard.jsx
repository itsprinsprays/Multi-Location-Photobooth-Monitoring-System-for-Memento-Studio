export default function UserSummaryCard({
  label,
  count,
  bgColor,
  description,
  dotColor = "bg-slate-400",
}) {
  return (
    <div className={`${bgColor} p-4 rounded-2xl`}>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
        <p className="text-xs tracking-wider font-semibold">{label}</p>
      </div>
      <p className="text-2xl font-bold mt-1">{count ?? 0}</p>
      <p className="text-slate-400 text-xs mt-0.5">{description}</p>
    </div>
  );
}