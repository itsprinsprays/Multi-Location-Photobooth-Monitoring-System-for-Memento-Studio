import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService"


export default function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authService.login(username, password);
            navigate("/booth-fleet-management")
        } catch(error) {
            setError(error.message || "Invalid Username or password");
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit}
                className="flex flex-col border rounded-xl border-gray-400 p-6 gap-2 bg-white">
                    <h1 className="font-bold text-xl">Welcome</h1>
                    <p className="text-slate-400">Log in with your employee credentials to access your <br />Memento Workspace</p>

                    {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-2 rounded-lg border border-red-200 mt-2">
                        {error}
                    </div>
                    )}

                    <div className="flex flex-col gap-2 mt-4">
                        <p className="text-slate-500 font-bold ">Username</p>
                        <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded-lg border-gray-400 p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-slate-500 font-bold">Password</p>
                        <input
                        type="text"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg border-gray-400 p-2"
                        />
                    </div>

                    <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-black p-2 rounded-lg text-white mt-4 font-semibold hover:bg-gray-800 disabled:opacity-50 transition">
                            {loading ? "Signing in..." : "Log In"}
                            </button>
                            
                    <div className="flex flex-col items-center mt-2">
                        <p className="text-slate-400 text-xs">Having trouble signing in?</p>
                        <p className="font-semibold text-xs">Contact your administrator</p>
                    </div>
                </form>
            </div>
        </>
    )
}