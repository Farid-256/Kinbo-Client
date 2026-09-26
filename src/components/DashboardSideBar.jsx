import { Bars, House, Box, CirclePlus, ChartColumn } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashBoardSideBar() {
    const navItems = [
        { icon: House, href:'/dashboard/seller', label: "Home" },
        { icon: ChartColumn, href:'/dashboard/seller/company', label: "Company" },
        { icon: Box, href:'/dashboard/seller/products', label: "Products" },
        { icon: CirclePlus, href:'/dashboard/seller/products/addProducts', label: "Add Products" },
    ]

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