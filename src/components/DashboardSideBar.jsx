'use client'
import { useSession } from "@/lib/auth-client";
import { Bars, House, Box, CirclePlus, ChartColumn, TagDollar } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";


const adminManu = [
    { icon: ChartColumn, href: '/dashboard/admin/adminProfele', label: "Admin Profile" },
    { icon: Box, href: '/dashboard/admin/order', label: "Products" },
    { icon: CirclePlus, href: '/dashboard/seller/products/addProducts', label: "Add Products" },
]
const sellerManu = [
    { icon: ChartColumn, href: '/dashboard/seller', label: "Company Profile" },
    { icon: Box, href: '/dashboard/seller/products', label: "Products" },
    { icon: CirclePlus, href: '/dashboard/seller/products/addProducts', label: "Add Products" },
    { icon: TagDollar, href: '/dashboard/seller/orders', label: "Orders" },
]
const customerManu = [
    { icon: House, href: '/dashboard/customer/customerProfile', label: "Profile" },
    { icon: ChartColumn, href: '/dashboard/customer/order', label: "Order" },
]




export function DashBoardSideBar() {
    const { data: session } = useSession()
    const role = session?.user?.role

    let navItems = []
    if (role === 'admin') {
       navItems = adminManu
    }
    else if (role === 'business') {
        navItems = sellerManu
    }
    else {
        navItems = customerManu
    }

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link key={item.label}
                className="flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default" href={item.href}>
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="border border-r p-2 w-48 hidden lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className='md:hidden' variant="secondary ">
                    <Bars />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>

    );
}