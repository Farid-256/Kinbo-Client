import { DashBoardSideBar } from "@/components/DashboardSideBar"


const layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <DashBoardSideBar></DashBoardSideBar>
            <main className="flex-1">
                {children}
            </main>

        </div>
    )
       
}

export default layout