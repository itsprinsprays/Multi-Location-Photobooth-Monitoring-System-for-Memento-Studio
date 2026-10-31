import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


export default function Layout() {
    return(
        <div className="flex flex-row min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}