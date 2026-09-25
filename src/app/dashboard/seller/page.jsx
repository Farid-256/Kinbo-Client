'use client'

import { useSession } from "@/lib/auth-client";
import { BsBag } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { PiPants, PiSneakerDuotone, PiTShirtDuotone } from "react-icons/pi";
import { RiAlignItemBottomFill } from "react-icons/ri";

const Seller = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user

    if (isPending === true) {
        return <h2 className="text-5xl text-blue-800 text-center py-20">Loading...</h2>
    }

    if (!user) {
        return <h3 className="text-center text-xl py-20 text-red-500">Please Login First</h3>
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">


            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
                    <p className="text-gray-500 mt-1">
                        Welcome back, <span className="font-semibold text-gray-700">{user.name}</span>! Here is your store overview.
                    </p>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-xl text-2xl">
                        <GoGraph />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-800">452000 Taka</h3>
                        <p className="text-xs text-green-500 font-medium mt-1">+12% from last month</p>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-xl text-2xl">
                        <RiAlignItemBottomFill />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800">1200</h3>
                        <p className="text-xs text-green-500 font-medium mt-1">+5% from last month</p>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-orange-50 text-orange-600 rounded-xl text-2xl">
                        <BsBag />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Products</p>
                        <h3 className="text-2xl font-bold text-gray-800">35</h3>
                        <p className="text-xs text-red-500 font-medium mt-1">2 out of stock</p>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl text-2xl">
                        <FaRegClock />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800">08</h3>
                        <p className="text-xs text-yellow-600 font-medium mt-1">Needs attention</p>
                    </div>
                </div>
            </div>


            <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-center items-center">
                    <h2 className="text-xl font-bold text-gray-800">Top Selling Products</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-medium">Product Name</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Units Sold</th>
                                <th className="px-6 py-4 font-medium">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">

                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-xs"><PiTShirtDuotone className="text-2xl" /></span>
                                    T-Shirt (Black, L)
                                </td>
                                <td className="px-6 py-4 text-gray-600">Fashion</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">90</td>
                                <td className="px-6 py-4 font-semibold text-green-600">22,500 Taka</td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-xs"><PiPants className="text-2xl" /></span>
                                    Pant (Blue, 32)
                                </td>
                                <td className="px-6 py-4 text-gray-600">Fashion</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">35</td>
                                <td className="px-6 py-4 font-semibold text-green-600">15,000 Taka</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-xs"><PiSneakerDuotone className="text-2xl" /></span>
                                    Sneakers (White, 42)
                                </td>
                                <td className="px-6 py-4 text-gray-600">Footwear</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">20</td>
                                <td className="px-6 py-4 font-semibold text-green-600">37,500 Taka</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Seller;