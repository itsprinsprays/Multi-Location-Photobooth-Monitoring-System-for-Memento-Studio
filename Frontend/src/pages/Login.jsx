import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import mementologo from "../assets/mementologo.png";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authService.login(username, password);
            navigate("/booth-fleet-management");
        } catch(error) {
            setError(error.message || "Invalid Username or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] overflow-hidden p-4">
            {/* Center Wrapper holding the Background Logo + Foreground Card */}
            <div className="relative w-full max-w-[430px] flex items-center justify-center">
                {/* Logo directly beneath/behind the form */}
                <img 
                    src={mementologo} 
                    alt="Memento Studios Watermark"
                    className="absolute w-[1080px] max-w-none h-auto object-contain pointer-events-none select-none z-0 opacity-[0.14]"
                />

                {/* Form Card on top of the logo */}
                <form 
                    onSubmit={handleSubmit}
                    className="relative z-10 w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col gap-5"
                >
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                        <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                            Log in with your employee credentials to access your Memento workspace.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5 mt-1">
                        <label className="text-xs font-semibold text-slate-700">Employee ID</label>
                        <input
                            type="text"
                            placeholder="EMP-00124"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-slate-400 hover:text-slate-600 transition focus:outline-none cursor-pointer"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition duration-150 shadow-sm text-sm mt-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Log In"}
                    </button>
                            
                    <div className="flex flex-col items-center justify-center text-center gap-0.5 mt-2">
                        <p className="text-slate-400 text-xs">Having trouble signing in?</p>
                        <p className="text-slate-800 font-semibold text-xs cursor-pointer hover:underline">
                            Contact your administrator.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
