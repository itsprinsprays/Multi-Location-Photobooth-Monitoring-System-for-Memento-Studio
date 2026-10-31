import { Link } from "react-router-dom";
import { MapPin, LayoutDashboard, ChartNoAxesCombined, Clock4, TrendingUp, UsersRound, Settings, LogOut } from "lucide-react";
import  logo  from "../../assets/logo.svg"

import Logo from "../ui/Logo"

export default function Navbar() {
    return (
        <>
        <aside className="w-20 h-screen sm:w-64 bg-white flex flex-col duration-300">
            <div className="mb-2 p-4">
                <Logo className="hidden sm:flex sm:h-10"/> 
                <img src={logo} className="w-10 h-10 sm:hidden"/>
            </div>

            <div className="flex flex-col justify-between gap-2 flex-1 border-t-3 border-r-2 border-gray-200">

                <nav className="flex flex-col text-gray-600 p-4">
                    <p className="hidden sm:block text-gray-600 text-xs">MAIN MENU</p>
                    <Link to="" className="w-full flex flex-row items-center justify-center sm:justify-start gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <LayoutDashboard />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link> 

                    <Link to="" className="w-full flex flex-row items-center justify-center sm:justify-start gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <MapPin />
                        <span className="hidden sm:inline">Booth Management</span>
                    </Link>

                    <Link to="" className="w-full flex flex-row items-center justify-center sm:justify-start gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <ChartNoAxesCombined />
                        <span className="hidden sm:inline">Analytics</span>
                    </Link>

                    <Link to="" className="w-full flex flex-row items-center justify-center sm:justify-start gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <Clock4 />
                        <span className="hidden sm:inline"> Sessions</span>
                    </Link>

                    <Link to="" className="w-full flex flex-row items-center justify-center sm:justify-start gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <TrendingUp />
                        <span className="hidden sm:inline">Revenue</span>
                    </Link>

                    <Link to="" className="w-full flex flex-row items-center justify-center sm:justify-start gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                        <UsersRound />
                        <span className="hidden sm:inline">Users</span>
                    </Link>
                </nav>

                <div>
                    <div className="border-y-2 border-gray-300 px-4 py-2">
                        <Link to="" className="flex flex-row items-center justify-center sm:justify-start w-full gap-2 transitions-color duration-100 hover:bg-black hover:text-white p-2 rounded-xl">
                            <Settings />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>
                    </div>

                    <div className="flex flex-row p-4 gap-4 items-center justify-center sm:justify-between ">
                        <div className="flex gap-2">

                            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                                <p>PB</p>
                            </div> 

                            <div className="hidden sm:block">
                                <p className="font-semibold truncate">Prince Benitez</p>
                                <p className="text-gray-400 text-xs truncate">Administrator</p>
                            </div>

                        </div>

                         <button className="hidden sm:block cursor-pointer">
                                <LogOut className="p-1 text-red-500 hover:text-red-700 w-7 h-7" />
                            </button>
                        

                    </div>
                    <div className="flex sm:hidden justify-center pb-4">
                        <button className="cursor-pointer p-2 hover:bg-red-50 rounded-lg">
                            <LogOut className="text-red-500 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

        </aside>
        </>
    )
}