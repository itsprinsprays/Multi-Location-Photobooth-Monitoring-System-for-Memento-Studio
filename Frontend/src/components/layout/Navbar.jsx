import { Link } from "react-router-dom";
import { MapPin, LayoutDashboard, ChartNoAxesCombined, Clock4, TrendingUp, UsersRound, Settings, LogOut } from "lucide-react";

import Logo from "../ui/Logo"

export default function Navbar() {
    return (
        <>
        <div className="w-64 h-screen bg-white flex flex-col ">
            <div className="mb-2 p-4">
                <Logo /> 
            </div>

            <div className="flex flex-col justify-between gap-2 h-screen border-t-3 border-r-2 border-gray-200">

                <nav className="flex flex-col text-gray-600 p-4">
                <p className="text-gray-600 text-xs">MAIN MENU</p>
                <Link to="" className="w-full flex flex-row items-center gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                <LayoutDashboard />
                <span>Dashboard</span>
                </Link> 

                <Link to="" className="w-full flex flex-row items-center gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                <MapPin />
                <span>Booth Management</span>
                </Link>

                <Link to="" className="w-full flex flex-row items-center gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                <ChartNoAxesCombined />
                <span>Analytics</span>
                </Link>

                <Link to="" className="w-full flex flex-row items-center gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                <Clock4 />
                <span> Sessions</span>
                </Link>

                <Link to="" className="w-full flex flex-row items-center gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                <TrendingUp />
                <span>Revenue</span>
                </Link>

                <Link to="" className="w-full flex flex-row items-center gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                <UsersRound />
                <span>Users</span>
                </Link>
                </nav>

                <div>
                    <div className="border-y-2 border-gray-300 px-4 py-2">
                        <Link to="" className="flex flex-row items-center w-full gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <Settings />
                        <span>Settings</span>
                        </Link>
                    </div>
                    <div className="flex flex-row p-4 gap-4 items-center justify-between">
                        <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                            <p>PB</p>
                        </div> 
                        <div>
                            <p className="font-semibold">Prince Benitez</p>
                            <p className="text-gray-400 text-xs">Administrator</p>
                        </div>
                        </div>
                        <LogOut className="p-1 text-[red]"/>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}