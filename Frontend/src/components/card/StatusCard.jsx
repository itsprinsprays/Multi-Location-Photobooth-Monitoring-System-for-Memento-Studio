export default function StatusCard({ label, count, color }) {
  return (
    <div className="border border-slate-800 px-4 py-2 bg-black rounded-2xl text-white">
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${color} flex-shrink-0`}></span>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
      </div>
      <p className="text-xl font-bold mt-0.5">{count}</p>
    </div>
  );
}