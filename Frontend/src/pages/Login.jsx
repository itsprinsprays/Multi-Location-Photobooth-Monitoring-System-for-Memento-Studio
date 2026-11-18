


export default function Login() {
    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col border rounded-xl border-gray-400 p-6 gap-2 bg-white">
                    <h1 className="font-bold text-xl">Welcome</h1>
                    <p className="text-slate-400">Log in with your employee credentials to access your <br />Memento Workspace</p>

                    <div className="flex flex-col gap-2 mt-4">
                        <p className="text-slate-500 font-bold ">Username</p>
                        <input
                        type="text"
                        placeholder="Enter username"
                        className="border rounded-lg border-gray-400 p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-slate-500 font-bold">Password</p>
                        <input
                        type="text"
                        placeholder="Enter password"
                        className="border rounded-lg border-gray-400 p-2"
                        />
                    </div>

                    <button className="bg-black p-2 rounded-lg text-white mt-2">Log In</button>
                    <div className="flex flex-col items-center mt-2">
                        <p className="text-slate-400 text-xs">Having trouble signing in?</p>
                        <p className="font-semibold text-xs">Contact your administrator</p>
                    </div>
                </div>
            </div>
        </>
    )
}