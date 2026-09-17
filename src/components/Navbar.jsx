'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";



const Navbar = () => {
    const pathName = usePathname()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const closeMenu = () =>{
        setOpen(false)
    }


    return (
        <>
            <nav className="px-5 md:px10 lg:px-20 py-2 border-b flex justify-between items-center sticky">

                <div>
                    <Link className="flex items-center" href={'/'}>
                        <Image src='/assets/my-cart.jpg' height={80} width={80} alt="logo"></Image>
                        <h3 className="text-3xl font-bold text-blue-800">Kinbo</h3>
                    </Link>
                </div>

                <div className="hidden md:flex gap-5">
                    <Link href='/' className={`text-xl ${pathName === '/' ? 'font-bold text-blue-500' : 'text-xl text-gray-500'}`}>Home</Link>

                    <Link href='/shop' className={`text-xl ${pathName === '/shop' ? 'font-bold text-blue-500' : 'text-gray-500'}`}>Shop</Link>

                    <Link href='/dashboard' className={`text-xl ${pathName === '/dashboard' ? 'font-bold text-blue-500' : 'text-gray-500'}`}>Dashboard</Link>

                    <Link href='/about' className={`text-xl ${pathName === '/about' ? 'font-bold text-blue-500' : 'text-gray-500'}`}>About</Link>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <div className="flex flex-col items-center">

                        <h3 className="text-2xl"><BsCart3 /></h3>

                        <div className="flex gap-1">
                            <h3 className="text-xl text-gray-500">My Cart</h3>
                            <h4 className="text-green-500">(0)</h4>
                        </div>
                    </div>

                    <button className="px-8 py-2 bg-blue-900 font-bold text-yellow-200 cursor-pointer hover:bg-blue-800 hover:text-white">Login</button>
                </div>

                <button onClick={handleClick} className="md:hidden">{open === false ? <IoReorderThreeOutline className="text-3xl" /> : <RxCross2 className="text-3xl" />}</button>


            </nav>

            <div className="md:hidden flex flex-col pr-10 items-end">
                {
                    open === true && (<div className="flex flex-col gap-5">
                        <Link onClick={closeMenu} href='/' className={`text-xl ${pathName === '/' ? 'font-bold text-blue-500' : 'text-xl text-gray-500'}`}>Home</Link>

                        <Link onClick={closeMenu} href='/shop' className={`text-xl ${pathName === '/shop' ? 'font-bold text-blue-500' : 'text-gray-500'}`}>Shop</Link>

                        <Link onClick={closeMenu} href='/dashboard' className={`text-xl ${pathName === '/dashboard' ? 'font-bold text-blue-500' : 'text-gray-500'}`}>Dashboard</Link>

                        <Link onClick={closeMenu} href='/about' className={`text-xl ${pathName === '/about' ? 'font-bold text-blue-500' : 'text-gray-500'}`}>About</Link>

                        <button onClick={closeMenu} className="px-8 py-2 bg-blue-900 font-bold text-yellow-200 cursor-pointer hover:bg-blue-800 hover:text-white">Login</button>
                    </div>
                    )
                }
            </div>
        </>
    )
}

export default Navbar